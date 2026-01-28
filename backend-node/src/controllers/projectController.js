const { pool } = require("../config/database");
const {
  asyncHandler,
  ApiError,
  successResponse,
  paginate,
  createSlug,
} = require("../utils/helpers");
const logger = require("../utils/logger");

/**
 * Get all projects (with pagination, filtering, search)
 * GET /api/projects
 */
const getAllProjects = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 12,
    category,
    status,
    search,
    featured,
    sortBy = "created_at",
    sortOrder = "DESC",
  } = req.query;

  // Build WHERE clause
  let whereConditions = [];
  let whereValues = [];

  if (category && category !== "All") {
    whereConditions.push("category = ?");
    whereValues.push(category);
  }

  if (status) {
    whereConditions.push("status = ?");
    whereValues.push(status);
  }

  if (featured === "true") {
    whereConditions.push("featured = TRUE");
  }

  if (search) {
    whereConditions.push(
      "(title LIKE ? OR description LIKE ? OR client LIKE ? OR location LIKE ?)",
    );
    const searchTerm = `%${search}%`;
    whereValues.push(searchTerm, searchTerm, searchTerm, searchTerm);
  }

  const whereClause =
    whereConditions.length > 0 ? `WHERE ${whereConditions.join(" AND ")}` : "";

  // Get total count
  const [countResult] = await pool.execute(
    `SELECT COUNT(*) as total FROM projects ${whereClause}`,
    whereValues,
  );
  const total = countResult[0].total;

  // Calculate pagination
  const pagination = paginate(page, limit, total);

  // Validate sort options
  const allowedSortFields = ["created_at", "updated_at", "title", "year"];
  const allowedSortOrders = ["ASC", "DESC"];
  const sortField = allowedSortFields.includes(sortBy) ? sortBy : "created_at";
  const order = allowedSortOrders.includes(sortOrder.toUpperCase())
    ? sortOrder.toUpperCase()
    : "DESC";

  // Get projects with pagination
  const [projects] = await pool.execute(
    `SELECT id, slug, title, description, category, location, client, 
            main_contractor, consultant, area, value, year, status, featured, images, 
            created_at, updated_at
     FROM projects 
     ${whereClause}
     ORDER BY featured DESC, ${sortField} ${order}
     LIMIT ? OFFSET ?`,
    [
      ...whereValues,
      pagination.itemsPerPage.toString(),
      pagination.offset.toString(),
    ],
  );

  // Parse images JSON
  const parsedProjects = projects.map((project) => ({
    ...project,
    images: project.images ? JSON.parse(project.images) : [],
  }));

  res.json(
    successResponse(
      {
        projects: parsedProjects,
        pagination,
      },
      "Projects retrieved successfully",
    ),
  );
});

/**
 * Get single project by ID or slug
 * GET /api/projects/:identifier
 */
const getProject = asyncHandler(async (req, res) => {
  const { identifier } = req.params;

  // Check if identifier is numeric (ID) or string (slug)
  const isId = /^\d+$/.test(identifier);

  const [projects] = await pool.execute(
    `SELECT p.*, a.name as created_by_name
     FROM projects p
     LEFT JOIN admins a ON p.created_by = a.id
     WHERE ${isId ? "p.id = ?" : "p.slug = ?"}`,
    [identifier],
  );

  if (projects.length === 0) {
    throw new ApiError(404, "Project not found");
  }

  const project = {
    ...projects[0],
    images: projects[0].images ? JSON.parse(projects[0].images) : [],
  };

  res.json(successResponse(project, "Project retrieved successfully"));
});

/**
 * Create new project
 * POST /api/projects
 */
const createProject = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    location,
    client,
    mainContractor,
    consultant,
    area,
    value,
    year,
    status = "completed",
    featured = false,
    images = [],
  } = req.body;

  // Generate unique slug
  let slug = createSlug(title);
  let slugCounter = 1;

  // Check if slug exists and make it unique
  while (true) {
    const [existing] = await pool.execute(
      "SELECT id FROM projects WHERE slug = ?",
      [slug],
    );
    if (existing.length === 0) break;
    slug = `${createSlug(title)}-${slugCounter}`;
    slugCounter++;
  }

  const [result] = await pool.execute(
    `INSERT INTO projects (
      slug, title, description, category, location, client, 
      main_contractor, consultant, area, value, year, status, featured, images, created_by
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      slug,
      title,
      description || null,
      category,
      location || null,
      client || null,
      mainContractor || null,
      consultant || null,
      area || null,
      value || null,
      year || null,
      status,
      featured ? 1 : 0,
      JSON.stringify(images),
      req.admin.id,
    ],
  );

  // Fetch created project
  const [projects] = await pool.execute("SELECT * FROM projects WHERE id = ?", [
    result.insertId,
  ]);

  const project = {
    ...projects[0],
    images: projects[0].images ? JSON.parse(projects[0].images) : [],
  };

  logger.info(
    `Project created: ${title} (ID: ${result.insertId}) by admin ${req.admin.id}`,
  );

  res
    .status(201)
    .json(successResponse(project, "Project created successfully"));
});

/**
 * Update project
 * PUT /api/projects/:id
 */
const updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    category,
    location,
    client,
    mainContractor,
    consultant,
    area,
    value,
    year,
    status,
    featured,
    images,
  } = req.body;

  // Check if project exists
  const [existing] = await pool.execute(
    "SELECT id FROM projects WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Project not found");
  }

  // Build update query dynamically
  const updates = [];
  const values = [];

  if (title !== undefined) {
    updates.push("title = ?");
    values.push(title);
    // Also update slug if title changes
    let newSlug = createSlug(title);
    let slugCounter = 1;
    while (true) {
      const [slugExists] = await pool.execute(
        "SELECT id FROM projects WHERE slug = ? AND id != ?",
        [newSlug, id],
      );
      if (slugExists.length === 0) break;
      newSlug = `${createSlug(title)}-${slugCounter}`;
      slugCounter++;
    }
    updates.push("slug = ?");
    values.push(newSlug);
  }
  if (description !== undefined) {
    updates.push("description = ?");
    values.push(description);
  }
  if (category !== undefined) {
    updates.push("category = ?");
    values.push(category);
  }
  if (location !== undefined) {
    updates.push("location = ?");
    values.push(location);
  }
  if (client !== undefined) {
    updates.push("client = ?");
    values.push(client);
  }
  if (mainContractor !== undefined) {
    updates.push("main_contractor = ?");
    values.push(mainContractor);
  }
  if (consultant !== undefined) {
    updates.push("consultant = ?");
    values.push(consultant);
  }
  if (area !== undefined) {
    updates.push("area = ?");
    values.push(area);
  }
  if (value !== undefined) {
    updates.push("value = ?");
    values.push(value);
  }
  if (year !== undefined) {
    updates.push("year = ?");
    values.push(year);
  }
  if (status !== undefined) {
    updates.push("status = ?");
    values.push(status);
  }
  if (featured !== undefined) {
    updates.push("featured = ?");
    values.push(featured ? 1 : 0);
  }
  if (images !== undefined) {
    updates.push("images = ?");
    values.push(JSON.stringify(images));
  }

  if (updates.length === 0) {
    throw new ApiError(400, "No fields to update");
  }

  values.push(id);

  await pool.execute(
    `UPDATE projects SET ${updates.join(", ")} WHERE id = ?`,
    values,
  );

  // Fetch updated project
  const [projects] = await pool.execute("SELECT * FROM projects WHERE id = ?", [
    id,
  ]);

  const project = {
    ...projects[0],
    images: projects[0].images ? JSON.parse(projects[0].images) : [],
  };

  logger.info(`Project updated: ID ${id} by admin ${req.admin.id}`);

  res.json(successResponse(project, "Project updated successfully"));
});

/**
 * Delete project
 * DELETE /api/projects/:id
 */
const deleteProject = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Check if project exists
  const [existing] = await pool.execute(
    "SELECT id, title FROM projects WHERE id = ?",
    [id],
  );

  if (existing.length === 0) {
    throw new ApiError(404, "Project not found");
  }

  await pool.execute("DELETE FROM projects WHERE id = ?", [id]);

  logger.info(
    `Project deleted: ${existing[0].title} (ID: ${id}) by admin ${req.admin.id}`,
  );

  res.json(successResponse(null, "Project deleted successfully"));
});

/**
 * Get all categories
 * GET /api/projects/categories
 */
const getCategories = asyncHandler(async (req, res) => {
  const [categories] = await pool.execute(
    `SELECT c.*, COUNT(p.id) as project_count
     FROM categories c
     LEFT JOIN projects p ON p.category = c.name AND p.status != 'archived'
     WHERE c.is_active = TRUE
     GROUP BY c.id
     ORDER BY c.display_order ASC`,
  );

  res.json(successResponse(categories, "Categories retrieved successfully"));
});

/**
 * Get project statistics
 * GET /api/projects/stats
 */
const getStats = asyncHandler(async (req, res) => {
  // Get counts by category
  const [categoryStats] = await pool.execute(
    `SELECT category, COUNT(*) as count 
     FROM projects 
     WHERE status != 'archived'
     GROUP BY category`,
  );

  // Get counts by status
  const [statusStats] = await pool.execute(
    `SELECT status, COUNT(*) as count 
     FROM projects 
     GROUP BY status`,
  );

  // Get total count
  const [totalCount] = await pool.execute(
    "SELECT COUNT(*) as total FROM projects WHERE status != 'archived'",
  );

  // Get featured count
  const [featuredCount] = await pool.execute(
    "SELECT COUNT(*) as total FROM projects WHERE featured = TRUE AND status != 'archived'",
  );

  res.json(
    successResponse(
      {
        total: totalCount[0].total,
        featured: featuredCount[0].total,
        byCategory: categoryStats,
        byStatus: statusStats,
      },
      "Project statistics retrieved successfully",
    ),
  );
});

module.exports = {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getCategories,
  getStats,
};

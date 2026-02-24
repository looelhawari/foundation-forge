<#
.SYNOPSIS
    Migration script: Copies and transforms files from Vite React SPA to Next.js App Router.
    This handles bulk file operations and automatic "use client" directive injection.
#>

$ErrorActionPreference = "Stop"

$SOURCE = "D:\civil_website\frontend"
$TARGET = "D:\civil_website\frontend-next"

Write-Host "=== CPC Qatar: Vite -> Next.js Migration Script ===" -ForegroundColor Cyan
Write-Host ""

# ─────────────────────────────────────────────────────────
# 1. Copy public/ static files
# ─────────────────────────────────────────────────────────
Write-Host "[1/6] Copying public/ static files..." -ForegroundColor Yellow

$publicDir = Join-Path $TARGET "public"
New-Item -ItemType Directory -Path $publicDir -Force | Out-Null

# Copy existing public files
$publicFiles = @("favicon.ico", "og-image.png", "placeholder.svg", "manifest.json", ".htaccess")
foreach ($file in $publicFiles) {
    $src = Join-Path $SOURCE "public\$file"
    if (Test-Path $src) {
        Copy-Item $src (Join-Path $publicDir $file) -Force
        Write-Host "  Copied public/$file" -ForegroundColor DarkGray
    }
}

# ─────────────────────────────────────────────────────────
# 2. Move assets from src/assets/ to public/assets/
# ─────────────────────────────────────────────────────────
Write-Host "[2/6] Moving assets to public/assets/..." -ForegroundColor Yellow

$assetsTarget = Join-Path $publicDir "assets"
New-Item -ItemType Directory -Path $assetsTarget -Force | Out-Null
New-Item -ItemType Directory -Path (Join-Path $assetsTarget "services") -Force | Out-Null

$assetsSrc = Join-Path $SOURCE "src\assets"
if (Test-Path $assetsSrc) {
    Get-ChildItem $assetsSrc -File | ForEach-Object {
        Copy-Item $_.FullName (Join-Path $assetsTarget $_.Name) -Force
        Write-Host "  Copied assets/$($_.Name)" -ForegroundColor DarkGray
    }
    $servicesDir = Join-Path $assetsSrc "services"
    if (Test-Path $servicesDir) {
        Get-ChildItem $servicesDir -File | ForEach-Object {
            Copy-Item $_.FullName (Join-Path $assetsTarget "services\$($_.Name)") -Force
            Write-Host "  Copied assets/services/$($_.Name)" -ForegroundColor DarkGray
        }
    }
}

# Move cert files to public/cert/
$certTarget = Join-Path $publicDir "cert"
New-Item -ItemType Directory -Path $certTarget -Force | Out-Null
$certSrc = Join-Path $SOURCE "src\cert"
if (Test-Path $certSrc) {
    Get-ChildItem $certSrc -File | ForEach-Object {
        Copy-Item $_.FullName (Join-Path $certTarget $_.Name) -Force
        Write-Host "  Copied cert/$($_.Name)" -ForegroundColor DarkGray
    }
}

# ─────────────────────────────────────────────────────────
# 3. Copy component files (UI, sections, animations, layout, auth)
# ─────────────────────────────────────────────────────────
Write-Host "[3/6] Copying component files..." -ForegroundColor Yellow

$componentDirs = @(
    "components\ui",
    "components\sections",
    "components\animations",
    "components\layout",
    "components\auth"
)

foreach ($dir in $componentDirs) {
    $srcDir = Join-Path $SOURCE "src\$dir"
    $dstDir = Join-Path $TARGET "src\$dir"
    if (Test-Path $srcDir) {
        New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
        Get-ChildItem $srcDir -File | ForEach-Object {
            Copy-Item $_.FullName (Join-Path $dstDir $_.Name) -Force
        }
        $count = (Get-ChildItem $srcDir -File).Count
        Write-Host "  Copied $count files from $dir" -ForegroundColor DarkGray
    }
}

# Copy root-level components (ErrorBoundary, OptimizedMotion, etc.)
$rootComponents = @("ErrorBoundary.tsx", "OptimizedMotion.tsx")
foreach ($file in $rootComponents) {
    $src = Join-Path $SOURCE "src\components\$file"
    $dst = Join-Path $TARGET "src\components\$file"
    if (Test-Path $src) {
        New-Item -ItemType Directory -Path (Split-Path $dst) -Force | Out-Null
        Copy-Item $src $dst -Force
        Write-Host "  Copied components/$file" -ForegroundColor DarkGray
    }
}

# ─────────────────────────────────────────────────────────
# 4. Copy hooks, lib, data, i18n
# ─────────────────────────────────────────────────────────
Write-Host "[4/6] Copying hooks, lib, data, i18n..." -ForegroundColor Yellow

$otherDirs = @("hooks", "lib", "data", "i18n", "i18n\locales")
foreach ($dir in $otherDirs) {
    $srcDir = Join-Path $SOURCE "src\$dir"
    $dstDir = Join-Path $TARGET "src\$dir"
    if (Test-Path $srcDir) {
        New-Item -ItemType Directory -Path $dstDir -Force | Out-Null
        Get-ChildItem $srcDir -File -ErrorAction SilentlyContinue | ForEach-Object {
            Copy-Item $_.FullName (Join-Path $dstDir $_.Name) -Force
        }
        $count = @(Get-ChildItem $srcDir -File -ErrorAction SilentlyContinue).Count
        Write-Host "  Copied $count files from $dir" -ForegroundColor DarkGray
    }
}

# ─────────────────────────────────────────────────────────
# 5. Add "use client" directive to all .tsx/.ts client files
# ─────────────────────────────────────────────────────────
Write-Host "[5/6] Adding 'use client' directives..." -ForegroundColor Yellow

$clientDirs = @(
    "src\components",
    "src\hooks"
)

$excludeFiles = @("utils.ts") # Pure utility files that don't need "use client"

$count = 0
foreach ($dir in $clientDirs) {
    $fullDir = Join-Path $TARGET $dir
    if (Test-Path $fullDir) {
        Get-ChildItem $fullDir -Recurse -Include "*.tsx", "*.ts" | ForEach-Object {
            if ($excludeFiles -contains $_.Name) { return }
            # Skip JSON files and files that already have "use client"
            $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
            if ($content -and (-not $content.StartsWith('"use client"')) -and (-not $content.StartsWith("'use client'"))) {
                $newContent = "`"use client`";`n`n$content"
                Set-Content $_.FullName -Value $newContent -NoNewline
                $count++
            }
        }
    }
}
Write-Host "  Added 'use client' to $count files" -ForegroundColor DarkGray

# ─────────────────────────────────────────────────────────
# 6. Transform imports across all copied files
# ─────────────────────────────────────────────────────────
Write-Host "[6/6] Transforming imports..." -ForegroundColor Yellow

$transformCount = 0
$allTsFiles = Get-ChildItem (Join-Path $TARGET "src") -Recurse -Include "*.tsx", "*.ts" -ErrorAction SilentlyContinue

foreach ($file in $allTsFiles) {
    $content = Get-Content $file.FullName -Raw
    $original = $content

    # ── Replace react-router-dom imports with router-compat ──
    # Handle various import patterns from react-router-dom
    $content = $content -replace 'from\s+["'']react-router-dom["'']', 'from "@/lib/router-compat"'

    # ── Replace import.meta.env with process.env ──
    $content = $content -replace 'import\.meta\.env\.VITE_API_URL', 'process.env.NEXT_PUBLIC_API_URL'
    $content = $content -replace 'import\.meta\.env\.DEV', 'process.env.NODE_ENV === "development"'
    $content = $content -replace 'import\.meta\.env', 'process.env'

    # ── Replace asset imports with public path strings ──
    # Transform: import foo from "@/assets/bar.jpg" → const foo = "/assets/bar.jpg"
    $content = $content -replace 'import\s+(\w+)\s+from\s+["'']@/assets/([^"'']+)["'']', 'const $1 = "/assets/$2"'

    # ── Replace cert imports with public path strings ──
    # Transform: import foo from "@/cert/bar.pdf" → const foo = "/cert/bar.pdf"
    $content = $content -replace 'import\s+(\w+)\s+from\s+["'']@/cert/([^"'']+)["'']', 'const $1 = "/cert/$2"'

    # ── Replace react-helmet-async imports (remove them) ──
    $content = $content -replace 'import\s+\{[^}]*\}\s+from\s+["'']react-helmet-async["''];?\s*\n?', ''

    if ($content -ne $original) {
        Set-Content $file.FullName -Value $content -NoNewline
        $transformCount++
    }
}

Write-Host "  Transformed imports in $transformCount files" -ForegroundColor DarkGray

Write-Host ""
Write-Host "=== Migration script complete! ===" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Router compat layer will be created manually" -ForegroundColor DarkGray
Write-Host "  2. App Router pages will be created manually" -ForegroundColor DarkGray
Write-Host "  3. Root layout.tsx will be created manually" -ForegroundColor DarkGray

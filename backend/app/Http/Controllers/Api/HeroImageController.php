<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HeroImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class HeroImageController extends Controller
{
    public function index()
    {
        $images = HeroImage::where('is_active', true)
            ->orderBy('order')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $images
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_active' => 'boolean',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,webp|max:10240'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('hero-images', 'public');
            $data['image_url'] = Storage::url($path);
        }

        $heroImage = HeroImage::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Hero image created successfully',
            'data' => $heroImage
        ], 201);
    }

    public function show($id)
    {
        $image = HeroImage::find($id);

        if (!$image) {
            return response()->json([
                'success' => false,
                'message' => 'Hero image not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $image
        ]);
    }

    public function update(Request $request, $id)
    {
        $heroImage = HeroImage::find($id);

        if (!$heroImage) {
            return response()->json([
                'success' => false,
                'message' => 'Hero image not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'nullable|string|max:255',
            'alt_text' => 'nullable|string|max:255',
            'order' => 'integer',
            'is_active' => 'boolean',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:10240'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $data = $request->except('image');

        if ($request->hasFile('image')) {
            // Delete old image
            if ($heroImage->image_url) {
                $oldPath = str_replace('/storage/', '', parse_url($heroImage->image_url, PHP_URL_PATH));
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('hero-images', 'public');
            $data['image_url'] = Storage::url($path);
        }

        $heroImage->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Hero image updated successfully',
            'data' => $heroImage
        ]);
    }

    public function destroy($id)
    {
        $heroImage = HeroImage::find($id);

        if (!$heroImage) {
            return response()->json([
                'success' => false,
                'message' => 'Hero image not found'
            ], 404);
        }

        // Delete image file
        if ($heroImage->image_url) {
            $path = str_replace('/storage/', '', parse_url($heroImage->image_url, PHP_URL_PATH));
            Storage::disk('public')->delete($path);
        }

        $heroImage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Hero image deleted successfully'
        ]);
    }

    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*.id' => 'required|exists:hero_images,id',
            'images.*.order' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->images as $imageData) {
            HeroImage::where('id', $imageData['id'])->update(['order' => $imageData['order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Hero images reordered successfully'
        ]);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServiceImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ServiceImageController extends Controller
{
    public function index()
    {
        $images = ServiceImage::where('is_active', true)
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'features' => 'nullable|array',
            'features.*' => 'string',
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
            $path = $request->file('image')->store('service-images', 'public');
            $data['image_url'] = Storage::url($path);
        }

        $serviceImage = ServiceImage::create($data);

        return response()->json([
            'success' => true,
            'message' => 'Service image created successfully',
            'data' => $serviceImage
        ], 201);
    }

    public function show($id)
    {
        $image = ServiceImage::find($id);

        if (!$image) {
            return response()->json([
                'success' => false,
                'message' => 'Service image not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $image
        ]);
    }

    public function update(Request $request, $id)
    {
        $serviceImage = ServiceImage::find($id);

        if (!$serviceImage) {
            return response()->json([
                'success' => false,
                'message' => 'Service image not found'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'description' => 'string',
            'features' => 'nullable|array',
            'features.*' => 'string',
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
            if ($serviceImage->image_url) {
                $oldPath = str_replace('/storage/', '', parse_url($serviceImage->image_url, PHP_URL_PATH));
                Storage::disk('public')->delete($oldPath);
            }

            $path = $request->file('image')->store('service-images', 'public');
            $data['image_url'] = Storage::url($path);
        }

        $serviceImage->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Service image updated successfully',
            'data' => $serviceImage
        ]);
    }

    public function destroy($id)
    {
        $serviceImage = ServiceImage::find($id);

        if (!$serviceImage) {
            return response()->json([
                'success' => false,
                'message' => 'Service image not found'
            ], 404);
        }

        // Delete image file
        if ($serviceImage->image_url) {
            $path = str_replace('/storage/', '', parse_url($serviceImage->image_url, PHP_URL_PATH));
            Storage::disk('public')->delete($path);
        }

        $serviceImage->delete();

        return response()->json([
            'success' => true,
            'message' => 'Service image deleted successfully'
        ]);
    }

    public function reorder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'images' => 'required|array',
            'images.*.id' => 'required|exists:service_images,id',
            'images.*.order' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        foreach ($request->images as $imageData) {
            ServiceImage::where('id', $imageData['id'])->update(['order' => $imageData['order']]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Service images reordered successfully'
        ]);
    }
}

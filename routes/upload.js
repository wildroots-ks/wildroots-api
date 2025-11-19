import { uploadImage } from '@/lib/api';
<div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Image URL (optional)
  </label>
  <div className="space-y-2">
    <input
      type="text"
      value={formData.imageUrl}
      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage-500"
      placeholder="https://example.com/image.jpg or /uploads/filename.jpg"
    />
    <div className="flex items-center gap-2">
      <input
        type="file"
        accept="image/*"
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) {
            try {
              const result = await uploadImage(file);
              setFormData({ ...formData, imageUrl: result.imageUrl });
              alert('Image uploaded successfully!');
            } catch (error) {
              alert('Upload failed: ' + error);
            }
          }
        }}
        className="text-sm"
      />
      <span className="text-xs text-gray-500">Max 5MB</span>
    </div>
  </div>
</div>
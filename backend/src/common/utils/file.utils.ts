import * as fs from 'fs';
import * as path from 'path';
export function createUploadsDirectory() {
  try {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
      console.log('Created uploads directory.');
    }
  } catch {
    console.log('Error creating upload directory');
    // console.log(err);
  }
}

export function deleteImages(images: string[]) {
  try {
    for (const image of images) {
      fs.unlinkSync(path.join(process.cwd(), 'uploads', image));
    }
  } catch {
    console.log('Error deleting images', images);
    // console.log(err);
  }
}

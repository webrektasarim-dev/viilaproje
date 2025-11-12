import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import * as sharp from 'sharp';

@Injectable()
export class UploadService {
  private uploadDir: string;

  constructor(private configService: ConfigService) {
    this.uploadDir = this.configService.get('UPLOAD_DESTINATION') || './uploads';
    this.ensureUploadDir();
  }

  private ensureUploadDir() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }

    // Create subdirectories
    ['villas', 'profiles', 'temp'].forEach((dir) => {
      const subDir = path.join(this.uploadDir, dir);
      if (!fs.existsSync(subDir)) {
        fs.mkdirSync(subDir, { recursive: true });
      }
    });
  }

  async uploadImage(file: any, folder: string = 'villas'): Promise<string> {
    const filename = `${uuidv4()}-${Date.now()}.jpg`;
    const filepath = path.join(this.uploadDir, folder, filename);

    // Optimize image with sharp
    await sharp(file.buffer)
      .resize(1920, 1080, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 85 })
      .toFile(filepath);

    // Return URL path
    return `/uploads/${folder}/${filename}`;
  }

  async uploadMultipleImages(files: any[], folder: string = 'villas'): Promise<string[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteFile(filePath: string): Promise<void> {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
    }
  }

  // AWS S3 upload (for production)
  // async uploadToS3(file: Express.Multer.File): Promise<string> {
  //   const s3 = new AWS.S3();
  //   const key = `${uuidv4()}-${file.originalname}`;
  //   await s3.upload({
  //     Bucket: this.configService.get('AWS_S3_BUCKET'),
  //     Key: key,
  //     Body: file.buffer,
  //     ContentType: file.mimetype,
  //   }).promise();
  //   return key;
  // }
}


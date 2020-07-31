import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/MulterConfig';

import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.directory, file),
      path.resolve(uploadConfig.directory, 'uploads', file),
    );
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.directory, 'uploads', file);
    try {
      fs.promises.stat(filePath);
      await fs.promises.unlink(filePath);
    } catch {
      return;
    }
  }
}

export default DiskStorageProvider;

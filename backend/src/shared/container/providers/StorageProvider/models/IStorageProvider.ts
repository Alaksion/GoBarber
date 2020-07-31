export default interface IStorageProvider {
  saveFile(filePath: string): Promise<string>;
  deleteFile(filepath: string): Promise<void>;
}

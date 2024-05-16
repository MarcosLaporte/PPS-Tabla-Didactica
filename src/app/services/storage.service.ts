import { Injectable } from '@angular/core';
import { ListResult, Storage, getDownloadURL, listAll, ref, uploadBytes } from '@angular/fire/storage';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	constructor(private storage: Storage) { }

	async uploadFile(file: File, path: string): Promise<string> {
		const fileRef = ref(this.storage, path);
    
		try {
      await uploadBytes(fileRef, file);
			return await getDownloadURL(fileRef);
      console.log();
      
		} catch (error) {
			throw Error('Hubo un problema al subir el archivo.');
		}
	}

  async getFileDownloadUrl(path: string): Promise<string> {
    const fileRef = ref(this.storage, path);
    return await getDownloadURL(fileRef);
  }

  async getAllFiles(path: string): Promise<ListResult> {
    const listRef = ref(this.storage, path);
    return await listAll(listRef)
  }
}
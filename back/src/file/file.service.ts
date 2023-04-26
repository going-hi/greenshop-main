import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { mkdir, writeFile, unlink } from 'fs/promises';
import {join} from 'path' 
import { exists } from 'src/utils/exists';

@Injectable()
export class FileService {

    async saveFile(file: Express.Multer.File) {
        
        const fileName = randomUUID() + '.' + file.mimetype.split('/')[1]
        const uploadForder = join(__dirname, '..', '../uploads') 
        const isDir = await exists(uploadForder)
        if(!isDir) {
           await mkdir(uploadForder, {recursive: true})
        }

        const dirMimetypeName = file.mimetype.split('/')[0]
        const dirMimetypePath = join(uploadForder, '/' + dirMimetypeName)
        const isDirMimeType = await exists(dirMimetypePath)

        if(!isDirMimeType) {
            await mkdir(dirMimetypePath, {recursive: true})
        }

        await writeFile(join(dirMimetypePath, fileName), file.buffer)
        return dirMimetypeName + '/' + fileName
    }

    async removeFile(fileName: string) {
        const [dir, file] = fileName.split('/')
        const pathFile = join(__dirname, '..', '../uploads', `/${dir}`, file)
        await unlink(pathFile)
    }
}

import {Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from 'multer'
import {extname} from 'path'
import {Response} from "express";
@Controller()
export class UploadController {
    @Post('upload')
    @UseInterceptors(FileInterceptor('image' ,{
        storage: diskStorage({
            destination: './uploads',
            filename(_,file, callback) {
                const randomName =  Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                return callback(null,`${randomName}${extname(file.originalname)}`);
            }
        })
    }))

    uploadFile(@UploadedFile() file) {
        console.log(file.path);
        const url =`http://localhost:3000/api/${file.path}`;
        const clean_url = url.replace(/([^:]\/)\/+/g, "$1")
        return {
            url: clean_url
        };
    }

    @Get('uploads/:path')
    async getImage(
        @Param('path') path,
        @Res() res:Response
    ){
         res.sendFile(path, {root: 'uploads'});
    }
}

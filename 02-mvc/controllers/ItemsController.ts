import { Request, Response } from 'express';
import { items, users, PrismaClient, categories } from '@prisma/client';
import { title } from 'process';

const prisma: PrismaClient = new PrismaClient();
// const session = require('express-session')

export class ItemsController {

    async index(req: Request, res: Response) {
        const items: items[] = await prisma.items.findMany();
        const categories: categories[] = await prisma.categories.findMany();

        console.log(req.session.auth);

        res.render('items/index', {
            'items': items,
            categories,
            auth: req.session.auth,
            admin: req.session.admin
        });
    }

    //Рендер всех обьектов
    async show(req: Request, res: Response) {
        console.log(req.params.id)
        const item = await prisma.items.findUnique({
            where: {
                id: Number(req.params.id)
            }
        });

        res.render('items/show', {
            'item': item,
            auth: req.session.auth,
            admin: req.session.admin
        });
    }

    //Создание коммента
    // async createComment(req: Request, res: Response) {
        
    // }

    //Рендер по категориям
    async categories(req: Request, res: Response) {
        const { id } = req.params;

        const items = await prisma.items.findMany({
            where: {
                id: Number(id),
            }
        });
        const categories: categories[] = await prisma.categories.findMany();

        console.log(req.params)
        res.render('items/index', {
            'items': items,
            'categories': categories,
            auth: req.session.auth,
            admin: req.session.admin
        });
    }

    //Создание категории
    async storeCategory(req: Request, res: Response) {
        const { title } = req.body;
        const categories = await prisma.categories.findMany({
            where: {
                title: title
            }
        });
        if (categories[0] != undefined) {
            res.redirect('/category/createCategory');
        } else if (categories[0] == '') {
            res.redirect('/category/createCategory');
        } else {
            await prisma.categories.create({
                data: {
                    title: title
                }
            });
            res.redirect('/items');
        }

    }
    createCategory(req: Request, res: Response) {
        res.render('category/createCategory', { 
            auth: req.session.auth,
            admin: req.session.admin 
        });
    }

    //Создание обьекта
    async store(req: Request, res: Response) {
        const { title, image, cat_id } = req.body;
        if (title == '' || image == '' || cat_id == '') {
            res.redirect('/items');
        } else {
            await prisma.items.create({
                data: {
                    title: title,
                    image: image,
                    category: {
                        connect: {
                            id: Number(cat_id)
                        }
                    }
                }
            });
        }

        res.redirect('/');
    }

    create(req: Request, res: Response) {
        res.render('items/create', { 
            auth: req.session.auth,
            admin: req.session.admin
         });
    }

    //Удаление обьекта
    async delete(req: Request, res: Response) {
        const { id } = req.body;
        await prisma.items.delete({
            where: {
                id: Number(id),
            }
        });
        res.redirect('/');
    }

    //Изменение обьекта
    async update(req: Request, res: Response) {
        const { id, title, image, cat_id } = req.body;

        if (cat_id == '') {
            res.redirect('/items/update');
        } else {
            await prisma.items.update({
                where: {
                    id: Number(id)
                },
                data: {
                    title,
                    image,
                    category: {
                        connect: {
                            id: Number(cat_id)
                        }
                    }
                }
            })
            res.redirect('/');
        }
    }

}

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const session = require('express-session')
class ItemsController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany();
            const categories = yield prisma.categories.findMany();
            console.log(req.session.auth);
            res.render('items/index', {
                'items': items,
                categories,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Рендер всех обьектов
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.id);
            const item = yield prisma.items.findUnique({
                where: {
                    id: Number(req.params.id)
                }
            });
            res.render('items/show', {
                'item': item,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Создание коммента
    // async createComment(req: Request, res: Response) {
    // }
    //Рендер по категориям
    categories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    id: Number(id),
                }
            });
            const categories = yield prisma.categories.findMany();
            console.log(req.params);
            res.render('items/index', {
                'items': items,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin
            });
        });
    }
    //Создание категории
    storeCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = req.body;
            const categories = yield prisma.categories.findMany({
                where: {
                    title: title
                }
            });
            if (categories[0] != undefined) {
                res.redirect('/category/createCategory');
            }
            else if (categories[0] == '') {
                res.redirect('/category/createCategory');
            }
            else {
                yield prisma.categories.create({
                    data: {
                        title: title
                    }
                });
                res.redirect('/items');
            }
        });
    }
    createCategory(req, res) {
        res.render('category/createCategory', {
            auth: req.session.auth,
            admin: req.session.admin
        });
    }
    //Создание обьекта
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, image, cat_id } = req.body;
            if (title == '' || image == '' || cat_id == '') {
                res.redirect('/items');
            }
            else {
                yield prisma.items.create({
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
        });
    }
    create(req, res) {
        res.render('items/create', {
            auth: req.session.auth,
            admin: req.session.admin
        });
    }
    //Удаление обьекта
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.items.delete({
                where: {
                    id: Number(id),
                }
            });
            res.redirect('/');
        });
    }
    //Изменение обьекта
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, title, image, cat_id } = req.body;
            if (cat_id == '') {
                res.redirect('/items/update');
            }
            else {
                yield prisma.items.update({
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
                });
                res.redirect('/');
            }
        });
    }
}
exports.ItemsController = ItemsController;

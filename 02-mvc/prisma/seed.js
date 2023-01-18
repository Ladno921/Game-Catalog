const { PrismaClient } = require('@prisma/client');
const internal = require('stream');
const prisma = new PrismaClient();

async function main() {
    const createMany = await prisma.categories.createMany({
        data: [
            { title: "Открытый мир" },
            { title: "Шутеры" },
            { title: "Гонки" },
            { title: "Хоррор" },
            { title: "Выживание" }
        ],
        skipDuplicates: true
    }
    );
}

async function Items() {
    const createMany = await prisma.items.createMany({
        data: [
            {// 1
                title: "The Witcher 3: Wild Hunt",
                image: "Witcher3.jpeg",
                cat_id: Number(1),
            },{
                title: "Death Stranding 2",
                image: "DeathS2.jpeg",
                cat_id: Number(1),
            },{
                title: "The Elder Scrolls 5",
                image: "Skyrim.jpeg",
                cat_id: Number(1),
            },{
                title: "Marvels Spider-Man",
                image: "SpiderMan.jpeg",
                cat_id: Number(1),
            },{
                title: "Fallout 4",
                image: "Fallout4.jpeg",
                cat_id: Number(1),
            },// 2
            {
                title: "CS:GO",
                image: "cs-go.jpg",
                cat_id: Number(2),
            },{
                title: "Far Cry 5",
                image: "farCry5.jpg",
                cat_id: Number(2),
            },{
                title: "PUBG",
                image: "pubg.jpg",
                cat_id: Number(2),
            },{
                title: "COD Modern Warfare 3",
                image: "CallOfDuty.jpg",
                cat_id: Number(2),
            },{
                title: "Far Cry 6",
                image: "farCry6.jpg",
                cat_id: Number(2),
            },// 3
            {
                title: "Forza Horizon 4",
                image: "ForzaH4.jpg",
                cat_id: Number(3),
            },{
                title: "Forza Horizon 5",
                image: "ForzaH5.jpg",
                cat_id: Number(3),
            },{
                title: "Need for Speed Unbound",
                image: "NFSunb.jpg",
                cat_id: Number(3),
            },{
                title: "Redout 2",
                image: "redout2.jpg",
                cat_id: Number(3),
            },{
                title: "BeamNG DRIVE",
                image: "BeamNGDRIVE.jpg",
                cat_id: Number(3),
            },// 4

        ],
        skipDuplicates: true
    }
    );
}
Items()
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e);
        await prisma.$disconnect();
        process.exit(1);
    })
const Sequelize = require("sequelize");
console.log(process.env.DEV, ' development mode')

export const sequelize = new Sequelize(`${process.env.DEV === 'true' ? 'test_buildings' : 'test_buildings_test'}`, "root", "sqlpass1234", {
    dialect: "mysql",
    host: "localhost",
    define: {
        timestamps: false
    }
});


export const User = sequelize.define("user", {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    building_company: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    buildingId: {
        type: Sequelize.UUIDV4,
        allowNull: true
    },
    companyId: {
        type: Sequelize.UUIDV4,
        allowNull: true
    },
    created_at: Sequelize.DATE,
});

export const Building = sequelize.define("building", {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    country: {
        type: Sequelize.STRING,
        allowNull: false
    },
    locale: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: Sequelize.DATE,
});

export const Company = sequelize.define("company", {
    id: {
        type: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    logo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    created_at: Sequelize.DATE,
});

const BuildingsAndCompanies = sequelize.define('bacs', {
    buildingId: {
        type: Sequelize.UUIDV4,
        allowNull: true
    },
    companyId: {
        type: Sequelize.UUIDV4,
        allowNull: true
    },
});

Company.belongsToMany(Building, {through: BuildingsAndCompanies});
Building.belongsToMany(Company, {through: BuildingsAndCompanies});

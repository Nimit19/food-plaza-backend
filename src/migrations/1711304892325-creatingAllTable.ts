import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatingAllTable1711304892325 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Restaurants Table
    await queryRunner.createTable(
      new Table({
        name: "restaurants",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "shop_name",
            type: "varchar",
          },
          {
            name: "shop_discription",
            type: "varchar",
          },
          {
            name: "shop_logo_url",
            type: "varchar",
          },
          {
            name: "shop_bg_1",
            type: "varchar",
          },
          {
            name: "shop_bg_2",
            type: "varchar",
          },
          {
            name: "shop_bg_3",
            type: "varchar",
          },
          {
            name: "menu_page_1",
            type: "varchar",
          },
          {
            name: "menu_page_2",
            type: "varchar",
          },
          {
            name: "is_open",
            type: "boolean",
          },
          {
            name: "opening_time",
            type: "varchar",
          },
          {
            name: "closing_time",
            type: "varchar",
          },
          {
            name: "average_cost",
            type: "varchar",
          },
          {
            name: "ratings",
            type: "int",
          },
          {
            name: "location",
            type: "geography",
            spatialFeatureType: "Point",
            srid: 4326,
            isNullable: true,
          },
          {
            name: "address",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Food Categories
    await queryRunner.createTable(
      new Table({
        name: "food_categories",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "food_category_name",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Restaturants Food categories
    await queryRunner.createTable(
      new Table({
        name: "restaurant_food_categories",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "category_name",
            type: "varchar",
          },
          {
            name: "restaurants_id",
            type: "int",
          },
          {
            name: "foodCategories_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["restaurants_id"],
            referencedTableName: "restaurants",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["foodCategories_id"],
            referencedTableName: "food_categories",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Food Items
    await queryRunner.createTable(
      new Table({
        name: "food_items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "food_name",
            type: "varchar",
          },
          {
            name: "image_url",
            type: "varchar",
          },
          {
            name: "discription",
            type: "varchar",
          },
          {
            name: "available_quantity",
            type: "int",
          },
          {
            name: "price",
            type: "double precision",
          },
          {
            name: "food_tag",
            type: "varchar",
          },
          {
            name: "food_weather",
            type: "enum",
            enum: ["Monsoon", "Winter", "Summer"], // Enum values should be defined here
          },
          {
            name: "delivery_charge",
            type: "double precision",
          },
          {
            name: "preparing_time",
            type: "timestamp with time zone",
          },
          {
            name: "restaurants_id",
            type: "int",
          },
          {
            name: "restaurant_foodCategories_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["restaurants_id"],
            referencedTableName: "restaurants",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["restaurant_foodCategories_id"],
            referencedTableName: "restaurant_food_categories",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Carts
    await queryRunner.createTable(
      new Table({
        name: "carts",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "user_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // carts Items
    await queryRunner.createTable(
      new Table({
        name: "cart_items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "quantity",
            type: "int",
          },
          {
            name: "carts_id",
            type: "int",
          },
          {
            name: "food_items_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["carts_id"],
            referencedTableName: "carts",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["food_items_id"],
            referencedTableName: "food_items",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // coupons
    await queryRunner.createTable(
      new Table({
        name: "coupons",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "coupon_type",
            type: "enum",
            enum: ["Percentage", "Fixed"], // Enum values should be defined here
          },
          {
            name: "discount",
            type: "double precision",
          },
          {
            name: "code",
            type: "varchar",
          },
          {
            name: "expiry_date",
            type: "timestamp",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      }),
      true
    );

    // Orders
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "total_amount",
            type: "double precision",
          },
          {
            name: "to_pay",
            type: "double precision",
          },
          {
            name: "date",
            type: "timestamp",
          },
          {
            name: "order_status",
            type: "enum",
            enum: ["Completed", "Failed", "Pending"], // Enum values should be defined here
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "coupon_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["coupon_id"],
            referencedTableName: "coupons",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
          },
        ],
      }),
      true
    );

    // Orders Items
    await queryRunner.createTable(
      new Table({
        name: "order_items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "amount",
            type: "double precision",
          },
          {
            name: "order_id",
            type: "int",
          },
          {
            name: "cartItem_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["order_id"],
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["cartItem_id"],
            referencedTableName: "cart_items",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );

    // Payment History
    await queryRunner.createTable(
      new Table({
        name: "payment_history",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "payment_method",
            type: "enum",
            enum: ["Cash", "Credit Card", "Debit Card", "PayPal"], // Enum values should be defined here
          },
          {
            name: "amount",
            type: "double precision",
          },
          {
            name: "payable_amount",
            type: "double precision",
          },
          {
            name: "transaction_at",
            type: "timestamp",
          },
          {
            name: "status",
            type: "enum",
            enum: ["Pending", "Completed", "Failed"], // Enum values should be defined here
          },
          {
            name: "order_id",
            type: "int",
          },
          {
            name: "created_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp with time zone",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["order_id"],
            referencedTableName: "orders",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Payment History
    await queryRunner.dropTable("payment_history");

    // Orders items
    await queryRunner.dropTable("order_items");

    // Orders
    await queryRunner.dropTable("orders");

    // coupons
    await queryRunner.dropTable("coupons");

    // carts items
    await queryRunner.dropTable("cart_items");

    // carts
    await queryRunner.dropTable("carts");

    // Food Items
    await queryRunner.dropTable("food_items");

    // Restaturants Food categories
    await queryRunner.dropTable("restaurant_food_categories");

    // Food Categories
    await queryRunner.dropTable("food_categories");

    // Restaurants Table
    await queryRunner.dropTable("restaurants");
  }
}

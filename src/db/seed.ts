import bcrypt from "bcryptjs";
import { db } from "./index";
import { users, categories } from "./schema";

const ADMIN_EMAIL = "eric.silvestre@alumnes.joanpelegri.cat";

export async function seed() {
  // Check if admin already exists
  const existingUsers = await db.select().from(users);
  
  if (existingUsers.length === 0) {
    // Create admin user - password: TechCore2024!
    const passwordHash = await bcrypt.hash("TechCore2024!", 12);
    await db.insert(users).values({
      email: ADMIN_EMAIL,
      passwordHash,
      name: "Eric Silvestre",
      isAdmin: true,
    });
    console.log("✅ Admin user created");
  }

  // Check if categories exist
  const existingCategories = await db.select().from(categories);
  
  if (existingCategories.length === 0) {
    await db.insert(categories).values([
      {
        name: "Auriculares",
        slug: "auriculares",
        description: "Auriculares inalámbricos y con cable",
        icon: "headphones",
        image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      },
      {
        name: "Portátiles",
        slug: "portatiles",
        description: "Portátiles para trabajo y gaming",
        icon: "laptop",
        image: "https://images.pexels.com/photos/6969676/pexels-photo-6969676.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      },
      {
        name: "Smartphones",
        slug: "smartphones",
        description: "Los smartphones más potentes",
        icon: "smartphone",
        image: "https://images.pexels.com/photos/236086/pexels-photo-236086.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      },
      {
        name: "Accesorios",
        slug: "accesorios",
        description: "Accesorios tech esenciales",
        icon: "mouse",
        image: "https://images.pexels.com/photos/3184451/pexels-photo-3184451.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      },
      {
        name: "Smartwatches",
        slug: "smartwatches",
        description: "Relojes inteligentes",
        icon: "watch",
        image: "https://images.pexels.com/photos/24738079/pexels-photo-24738079.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      },
      {
        name: "Fotografía",
        slug: "fotografia",
        description: "Cámaras y equipo fotográfico",
        icon: "camera",
        image: "https://images.pexels.com/photos/10525641/pexels-photo-10525641.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
      },
    ]);
    console.log("✅ Categories created");
  }

  console.log("✅ Seed completed!");
}

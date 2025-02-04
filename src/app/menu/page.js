'use client';
import SectionHeaders from "@/components/layout/SectionHeaders";
import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const categories = await res.json();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const res = await fetch('/api/menu-items');
        if (!res.ok) throw new Error('Failed to fetch menu items');
        const menuItems = await res.json();
        setMenuItems(menuItems);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
    fetchMenuItems();
  }, []);
  return (
    <section className="mt-8">
      {categories?.length > 0 && categories.map(c => (
        <div key={c._id}>
          <div className="text-center">
            <SectionHeaders mainHeader={c.name} />
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
            {menuItems.filter(item => item.category === c._id).map(item => (
              <MenuItem key={item._id} {...item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
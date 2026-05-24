import { motion } from "motion/react";
import { ShoppingBag, Star, ArrowRight, Tag } from "lucide-react";

const PRODUCTS = [
  {
    title: "Data Visualization Masterclass",
    description: "A comprehensive course on creating high-fidelity data stories using Power BI and D3.",
    price: "$199",
    category: "Course",
    rating: 4.9
  },
  {
    title: "Project Management Toolkit",
    description: "A curated set of templates, frameworks, and tools for successful project delivery.",
    price: "$49",
    category: "Digital Asset",
    rating: 4.8
  },
  {
    title: "Strategic Consulting Session",
    description: "One-on-one consulting to help you articulate your data vision and strategy.",
    price: "$250/hr",
    category: "Service",
    rating: 5.0
  },
  {
    title: "Custom Dashboard Design",
    description: "Bespoke dashboard design and implementation tailored to your specific business needs.",
    price: "Custom",
    category: "Service",
    rating: 4.9
  }
];

export default function Store() {
  return (
    <main className="pt-24 md:pt-32 pb-20 px-6 md:px-24 min-h-screen bg-bg">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mb-16 md:mb-24"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-accent mb-6 block">
          Products & Services
        </span>
        <h1 className="text-4xl md:text-8xl font-display leading-tight mb-8">
          The Store <br /> (Curated Assets)
        </h1>
        <p className="text-muted text-base md:text-lg leading-relaxed max-w-2xl">
          A collection of digital assets, courses, and professional services designed to help you master data and project strategy.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {PRODUCTS.map((product, i) => (
          <motion.div
            key={product.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] border border-line/5 hover:border-accent/20 transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-8">
                <div className="bg-accent/5 text-accent p-4 rounded-2xl group-hover:scale-110 transition-transform duration-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-muted">
                  <Star className="w-3 h-3 text-accent fill-accent" />
                  {product.rating}
                </div>
              </div>
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-accent mb-4">
                <Tag className="w-3 h-3" />
                {product.category}
              </div>
              <h3 className="text-3xl mb-4 group-hover:text-accent transition-colors">{product.title}</h3>
              <p className="text-muted leading-relaxed mb-12">{product.description}</p>
            </div>
            
            <div className="flex items-center justify-between pt-8 border-t border-line/10">
              <div className="text-2xl font-sans">{product.price}</div>
              <button className="bg-ink text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-accent transition-colors">
                Purchase <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}

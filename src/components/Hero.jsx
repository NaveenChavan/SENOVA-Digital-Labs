// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Phone, ArrowRight, Sparkles, MessageCircle } from "lucide-react";

const FloatingBadge = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="absolute hidden xl:flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-border rounded-full px-4 py-2 shadow-sm"
  >
    {children}
  </motion.div>
);

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/[0.08] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/[0.05] rounded-full blur-[120px]" />
      </div>

      <FloatingBadge delay={0.8}>
        <Sparkles className="w-4 h-4 text-accent" />
        <span className="text-sm text-text-secondary">Premium Quality</span>
      </FloatingBadge>
      <FloatingBadge delay={1} className="top-1/3 right-10">
        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        <span className="text-sm text-text-secondary">24/7 Support</span>
      </FloatingBadge>
      <FloatingBadge delay={1.2} className="bottom-1/3 left-16">
        <span className="text-accent font-semibold">100+</span>
        <span className="text-sm text-text-secondary">Projects Delivered</span>
      </FloatingBadge>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          /* YAHAN FIX KIYA HAI: flex flex-col items-center add kiya hai */
          className="flex flex-col items-center justify-center text-center w-full"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-5 py-2.5 mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-accent font-medium">
              Digital Innovation Lab
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6 tracking-tight">
            Helping Businesses
            <br />
            <span className="text-gradient">Get More Customers</span>
            <br />
            Online
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed text-center">
            We build high-performance web systems and automation workflows that
            turn visitors into loyal customers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
            <a href="#contact-form" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto group flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-3.5 rounded-lg transition-all duration-300 cursor-pointer shadow-lg shadow-accent/20">
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </a>
            <a href="#portfolio" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-border hover:border-accent text-text-primary hover:text-accent font-medium px-8 py-3.5 rounded-lg transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm">
                <span>View Our Work</span>
              </button>
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <a
              href="tel:+919731133425"
              className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center group-hover:border-accent group-hover:shadow-md transition-all duration-200">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted">Call Us</p>
                <p className="text-sm font-medium text-text-primary">
                  +91 9731133425
                </p>
              </div>
            </a>
            <a
              href="https://wa.me/918088366098?text=Hello%20SENOVA%2C%20I%27m%20interested%20in%20your%20services"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-200 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-border flex items-center justify-center group-hover:border-accent group-hover:shadow-md transition-all duration-200">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs text-text-muted">WhatsApp</p>
                <p className="text-sm font-medium text-text-primary">
                  +91 8088366098
                </p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border bg-white/50 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-text-muted rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;

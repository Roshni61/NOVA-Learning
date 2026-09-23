import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileQuestion, Home, Sparkles, BookOpen } from 'lucide-react';
import { Button, Card, Badge } from '../../components/ui';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-lg w-full"
      >
        <Card className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 p-8 md:p-10 rounded-3xl shadow-nova-soft text-center space-y-6">
          {/* Visual 404 Icon Stack */}
          <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-500/15 rounded-3xl animate-pulse" />
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-300 rounded-2xl flex items-center justify-center shadow-md relative z-10">
              <FileQuestion className="w-8 h-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Badge variant="coral" className="gap-1.5 mx-auto">
              <Sparkles className="w-3.5 h-3.5 text-nova-coral" />
              404 Page Not Found
            </Badge>
            <h1 className="text-3xl font-black text-nova-charcoal dark:text-slate-100 pt-1">
              Lost in the Knowledge Universe?
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-sm mx-auto">
              We couldn't find the course, mission, or page you were looking for. It may have been moved or updated.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="coral"
              size="md"
              onClick={() => navigate('/today')}
              aria-label="Return to Today dashboard"
              className="w-full sm:w-auto gap-2 font-bold text-xs min-h-[44px]"
            >
              <Home className="w-4 h-4" /> Go to Dashboard
            </Button>
            <Link to="/catalog" className="w-full sm:w-auto">
              <Button
                variant="secondary"
                size="md"
                aria-label="Explore course catalog"
                className="w-full gap-2 font-bold text-xs min-h-[44px]"
              >
                <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Explore Catalog
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;

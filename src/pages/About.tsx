import React from 'react';
import { CheckCircle2, Users, Globe, Zap } from 'lucide-react';

const About = () => {
  const steps = [
    { title: 'Browse', description: 'Explore our curated collection of 500+ AI tools across dozens of categories.', icon: <Globe className="text-primary" /> },
    { title: 'Discover', description: 'Compare pricing, features, and reviews to find the perfect tool for your workflow.', icon: <Zap className="text-amber-500" /> },
    { title: 'Visit', description: 'Click through to the tool website and start boosting your productivity immediately.', icon: <CheckCircle2 className="text-emerald-500" /> },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-5xl font-extrabold text-slate-900 dark:text-white mb-6">About Digital Hub AI</h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
          We are on a mission to democratize access to artificial intelligence by making it easy for everyone to find the right tools for their needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
            The AI landscape is moving at breakneck speed. Every day, dozens of new tools are launched, promising to revolutionize how we work and create. But finding the right tool amidst the noise can be overwhelming.
          </p>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Digital Hub AI was created to be your trusted guide in this new era. We curate, categorize, and review the best AI tools so you can spend less time searching and more time building.
          </p>
        </div>
        <div className="bg-slate-100 dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-2">500+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Tools Listed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-2">20+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-2">10k+</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">Monthly Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-extrabold text-primary mb-2">100%</div>
              <div className="text-sm text-slate-500 uppercase tracking-wider font-bold">AI Focused</div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-slate-500 dark:text-slate-400">Three simple steps to supercharge your workflow.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {steps.map((step, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 text-center shadow-lg shadow-slate-200/50 dark:shadow-none">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-6">
              {React.cloneElement(step.icon as React.ReactElement<any>, { size: 32 })}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-slate-500 dark:text-slate-400">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;

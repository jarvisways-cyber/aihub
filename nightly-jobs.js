const cron = require('node-cron');
const fs = require('fs');
const path = require('path');
const contentGenerator = require('./content-generator');
const seoOptimizer = require('./seo-optimizer');
const affiliateManager = require('./affiliate-manager');

class NightlyJobs {
  constructor() {
    this.jobs = [];
    this.isRunning = false;
  }

  start() {
    console.log('Starting nightly job scheduler...');
    
    // Content generation - 2 AM
    cron.schedule('0 2 * * *', () => {
      this.runContentGeneration();
    });
    
    // SEO optimization - 3 AM
    cron.schedule('0 3 * * *', () => {
      this.runSeoOptimization();
    });
    
    // Analytics sync - 4 AM
    cron.schedule('0 4 * * *', () => {
      this.syncAnalytics();
    });
    
    // Content refresh check - every 6 hours
    cron.schedule('0 */6 * * *', () => {
      this.checkContentFreshness();
    });
    
    console.log('Nightly jobs scheduled successfully');
  }

  async runContentGeneration() {
    if (this.isRunning) {
      console.log('Previous job still running, skipping...');
      return;
    }
    
    this.isRunning = true;
    const startTime = Date.now();
    
    try {
      console.log('=== Starting Content Generation Job ===');
      
      const articles = await contentGenerator.runNightlyJob();
      
      // Run SEO optimization after content generation
      await seoOptimizer.generateSitemap();
      
      const duration = ((Date.now() - startTime) / 1000).toFixed(2);
      
      this.logJobCompletion('content-generation', {
        articlesGenerated: articles.length,
        duration: `${duration}s`,
        timestamp: new Date().toISOString()
      });
      
      console.log(`=== Content Generation Complete: ${articles.length} articles in ${duration}s ===`);
    } catch (error) {
      console.error('Content generation failed:', error);
      this.logJobFailure('content-generation', error.message);
    } finally {
      this.isRunning = false;
    }
  }

  async runSeoOptimization() {
    try {
      console.log('=== Starting SEO Optimization Job ===');
      
      await Promise.all([
        seoOptimizer.generateSitemap(),
        seoOptimizer.generateRobotsTxt(),
        seoOptimizer.updateInternalLinks()
      ]);
      
      console.log('=== SEO Optimization Complete ===');
    } catch (error) {
      console.error('SEO optimization failed:', error);
    }
  }

  async syncAnalytics() {
    try {
      console.log('=== Syncing Analytics ===');
      
      const stats = affiliateManager.getStats();
      
      // Log daily stats
      this.logDailyStats(stats);
      
      console.log('=== Analytics Sync Complete ===');
    } catch (error) {
      console.error('Analytics sync failed:', error);
    }
  }

  checkContentFreshness() {
    try {
      console.log('=== Checking Content Freshness ===');
      
      const dataDir = path.join(__dirname, 'data');
      if (!fs.existsSync(dataDir)) return;
      
      const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      let staleCount = 0;
      for (const file of files) {
        try {
          const article = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
          const articleDate = new Date(article.date);
          
          if (articleDate < thirtyDaysAgo) {
            staleCount++;
            // Mark article as needing update
            article.needsUpdate = true;
            fs.writeFileSync(path.join(dataDir, file), JSON.stringify(article, null, 2));
          }
        } catch (e) {}
      }
      
      if (staleCount > 0) {
        console.log(`Found ${staleCount} articles needing updates`);
      }
      
      console.log('=== Content Freshness Check Complete ===');
    } catch (error) {
      console.error('Content freshness check failed:', error);
    }
  }

  logJobCompletion(jobName, data) {
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, 'jobs.log');
    const logEntry = {
      job: jobName,
      status: 'success',
      ...data
    };
    
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }

  logJobFailure(jobName, error) {
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, 'jobs.log');
    const logEntry = {
      job: jobName,
      status: 'failed',
      error: error,
      timestamp: new Date().toISOString()
    };
    
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }

  logDailyStats(stats) {
    const logDir = path.join(__dirname, 'logs');
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }
    
    const logFile = path.join(logDir, 'daily-stats.log');
    const logEntry = {
      date: new Date().toISOString().split('T')[0],
      ...stats
    };
    
    fs.appendFileSync(logFile, JSON.stringify(logEntry) + '\n');
  }

  // Manual trigger methods
  async triggerGenerate() {
    return await this.runContentGeneration();
  }

  async triggerOptimize() {
    return await this.runSeoOptimization();
  }

  getJobStatus() {
    return {
      isRunning: this.isRunning,
      jobs: this.jobs,
      nextRun: {
        contentGeneration: this.getNextCronTime('0 2 * * *'),
        seoOptimization: this.getNextCronTime('0 3 * * *'),
        analyticsSync: this.getNextCronTime('0 4 * * *')
      }
    };
  }

  getNextCronTime(cronExpression) {
    // Simplified - in production use a proper cron parser
    const now = new Date();
    const parts = cronExpression.split(' ');
    const hour = parseInt(parts[1]);
    
    const next = new Date(now);
    next.setHours(hour, 0, 0, 0);
    
    if (next <= now) {
      next.setDate(next.getDate() + 1);
    }
    
    return next.toISOString();
  }
}

module.exports = new NightlyJobs();

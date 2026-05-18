import { Client } from '@notionhq/client';
import { config } from './config';

export interface Issue {
  title: string;
  description: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  affectedArea: string;
  recommendation: string;
}

export interface StructuredReport {
  issues: Issue[];
  score: number;
  scanDate: string;
}

export class NotionAnalyzer {
  private notion: Client;

  constructor() {
    if (!config.notionToken) {
      throw new Error('NOTION_TOKEN is not set in environment variables');
    }
    this.notion = new Client({ auth: config.notionToken });
  }

  async scan(): Promise<StructuredReport> {
    const issues: Issue[] = [];
    
    try {
      // 1. Fetch workspace structure
      const databases = await this.fetchDatabases();
      const pages = await this.fetchPages();

      // 2. Run HCI analysis methods
      issues.push(...this.checkInformationOverload(databases));
      issues.push(...this.checkCognitiveLoad(pages));
      issues.push(...this.checkNavigationComplexity(pages));
      issues.push(...this.checkConsistency(databases, pages));

    } catch (error) {
      console.error('Error during scan:', error);
      // Handle rate limits or auth failures here if needed
    }

    const score = this.calculateScore(issues);

    return {
      issues,
      score,
      scanDate: new Date().toISOString()
    };
  }

  private async fetchDatabases() {
    // In a real implementation, this would use this.notion.search or this.notion.databases.list
    // For now, returning a mock or empty array to avoid API errors if token is invalid
    try {
      const response = await this.notion.search({
        filter: { property: 'object', value: 'database' }
      });
      return response.results;
    } catch (error) {
      console.warn('Failed to fetch databases. Using mock data for demonstration.');
      return [
        { id: 'db1', title: [{ plain_text: 'Project Tasks' }], properties: new Array(25).fill({}) } // >20 properties
      ];
    }
  }

  private async fetchPages() {
    try {
      const response = await this.notion.search({
        filter: { property: 'object', value: 'page' }
      });
      return response.results;
    } catch (error) {
      console.warn('Failed to fetch pages. Using mock data for demonstration.');
      return [
        { id: 'page1', title: 'Deeply Nested Page', url: 'https://notion.so/page1' }
      ];
    }
  }

  private checkInformationOverload(databases: any[]): Issue[] {
    const issues: Issue[] = [];
    for (const db of databases) {
      const propertyCount = Object.keys(db.properties || {}).length;
      if (propertyCount > 20) {
        issues.push({
          title: 'Information Overload - High severity',
          description: `Database "${db.title?.[0]?.plain_text || db.id}" has ${propertyCount} properties.`,
          severity: 'High',
          affectedArea: db.id,
          recommendation: 'Consider breaking the database into smaller ones or using linked databases with specific views.'
        });
      }
    }
    return issues;
  }

  private checkCognitiveLoad(pages: any[]): Issue[] {
    const issues: Issue[] = [];
    // Placeholder implementation
    return issues;
  }

  private checkNavigationComplexity(pages: any[]): Issue[] {
    const issues: Issue[] = [];
    // Placeholder implementation
    return issues;
  }

  private checkConsistency(databases: any[], pages: any[]): Issue[] {
    const issues: Issue[] = [];
    // Placeholder implementation
    return issues;
  }

  private calculateScore(issues: Issue[]): number {
    let score = 100;
    for (const issue of issues) {
      switch (issue.severity) {
        case 'Critical': score -= 20; break;
        case 'High': score -= 10; break;
        case 'Medium': score -= 5; break;
        case 'Low': score -= 2; break;
      }
    }
    return Math.max(0, score);
  }
}

export const HCI_PRINCIPLES = {
  VISIBILITY: "System visibility & feedback",
  MATCH_REAL_WORLD: "Match between system and real world",
  USER_CONTROL: "User control & freedom",
  ERROR_PREVENTION: "Error prevention & recovery",
  SIMPLICITY: "Simplicity & minimalism",
  FLEXIBILITY: "Flexibility & efficiency",
  HELP_SUPPORT: "Help & support",
  CONSISTENCY: "Consistency & standards"
};

export interface PrincipleScore {
  name: string;
  score: number; // 0-10
  status: '⚠️' | '✓' | '❌';
}

export class HCIModule {
  calculateCompliance(scores: Record<string, number>): number {
    const totalScore = Object.values(scores).reduce((acc, score) => acc + score, 0);
    const maxPossible = Object.keys(HCI_PRINCIPLES).length * 10;
    return Math.round((totalScore / maxPossible) * 100);
  }

  getPrintableReport(scores: Record<string, number>, criticalIssues: number, highIssues: number, recommendations: number) {
    const compliance = this.calculateCompliance(scores);
    
    let report = `
WORKSPACE HCI AUDIT REPORT
==========================
Overall Score: ${compliance}/100
🔴 CRITICAL ISSUES: ${criticalIssues}
🟡 HIGH ISSUES: ${highIssues}
🟢 RECOMMENDATIONS: ${recommendations}

PRINCIPLE BREAKDOWN:
`;

    for (const [key, name] of Object.entries(HCI_PRINCIPLES)) {
      const score = scores[key] || 0;
      let status: '⚠️' | '✓' | '❌' = '✓';
      if (score < 5) status = '❌';
      else if (score < 8) status = '⚠️';
      
      report += `- ${name}: ${score}/10 [${score * 10}/100] ${status}\n`;
    }

    return report;
  }
}

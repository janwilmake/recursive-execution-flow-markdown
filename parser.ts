// This parser correctly parses the workflow defenition into simple hierarchical steps.
import { lexer, Token } from "marked";

export interface HMREFStep {
  id: number;
  parent_id: number | null;
  level: number;
  content: string;
}

export interface HMREFDocument {
  steps: HMREFStep[];
}

interface BlockquoteToken {
  type: "blockquote";
  raw: string;
  text: string;
  tokens: Token[];
}

export function parseHMREF(markdown: string): HMREFDocument {
  const tokens = lexer(markdown);
  const steps: HMREFStep[] = [];
  let currentId = 1;

  function processTokens(
    tokenList: Token[],
    level: number,
    parentId: number | null,
  ): void {
    let rootContent = "";
    let blockquotes: BlockquoteToken[] = [];

    // Separate root content from blockquotes
    for (const token of tokenList) {
      if (token.type === "blockquote") {
        blockquotes.push(token as BlockquoteToken);
      } else {
        rootContent += token.raw || "";
      }
    }

    let currentStepId: number | null = null;

    // Create step for non-blockquote content if it exists
    if (rootContent.trim()) {
      const step: HMREFStep = {
        id: currentId,
        parent_id: parentId,
        level: level,
        content: rootContent.trim(),
      };
      steps.push(step);
      currentStepId = currentId;
      currentId++;
    }

    // Process all blockquotes at the next level
    for (const blockquote of blockquotes) {
      processBlockquote(blockquote, level + 1, currentStepId || parentId);
    }
  }

  function processBlockquote(
    blockquoteToken: BlockquoteToken,
    level: number,
    parentId: number | null,
  ): void {
    // Extract content for this blockquote (excluding nested blockquotes)
    let content = "";
    let nestedBlockquotes: BlockquoteToken[] = [];

    for (const token of blockquoteToken.tokens) {
      if (token.type === "blockquote") {
        nestedBlockquotes.push(token as BlockquoteToken);
      } else {
        content += token.raw || "";
      }
    }

    let currentStepId: number | null = null;

    // Create step for this blockquote's content
    if (content.trim()) {
      const step: HMREFStep = {
        id: currentId,
        parent_id: parentId,
        level: level,
        content: content.trim(),
      };

      steps.push(step);
      currentStepId = currentId;
      currentId++;
    }

    // Process nested blockquotes recursively
    for (const nestedBlockquote of nestedBlockquotes) {
      processBlockquote(nestedBlockquote, level + 1, currentStepId || parentId);
    }
  }

  // Start processing from level 0 with no parent
  processTokens(tokens, 0, null);

  return { steps };
}

// Test the parser
const testMarkdown = `# Customer Onboarding Automation

**Input:** New customer registration request with basic contact information and service preferences

The system will validate the customer information, set up their account across multiple systems, and prepare welcome materials.

> # Identity Verification Service
>
> **Input:** Customer name, email, phone number, and government ID number
>
> This service will verify the customer's identity against multiple databases and check for any compliance issues.
>
> > # Credit Bureau Check
> >
> > **Input:** Full name, SSN, date of birth, current address
> >
> > Perform comprehensive credit history lookup and risk assessment to determine account limits and approval status.
> >
> > > # Deep Credit Analysis
> > >
> > > **Input:** Detailed financial history
> > >
> > > Perform deep analysis of credit patterns and behavioral scoring.
> > >
> > > > # Risk Modeling
> > > >
> > > > **Input:** All available data points
> > > >
> > > > Apply machine learning models for risk prediction.
> > > >
> > > > **Output:** Risk probability scores and recommendations
> > >
> > > **Output:** Enhanced credit assessment with behavioral insights
> >
> > **Output:** Credit score, risk rating, recommended account tier, and any flags or restrictions
>
> > # Sanctions Screening
> >
> > **Input:** Full name, date of birth, known aliases, current and previous addresses
> >
> > Cross-reference customer information against government watchlists, sanctions lists, and politically exposed persons databases.
> >
> > **Output:** Clear/flag status, match confidence scores, any regulatory restrictions or enhanced due diligence requirements
>
> **Output:** Identity verification status (approved/rejected/pending), compliance clearance level, recommended account type, and any required follow-up actions

> # Account Provisioning Service
>
> **Input:** Verified customer information, approved account type, service preferences, and compliance requirements
>
> Create customer accounts across all necessary systems and configure initial settings based on their service tier.
>
> **Output:** Complete account setup confirmation, customer ID, login credentials, configured services list, and integration status

**Output:** Fully onboarded customer with verified identity, provisioned accounts across all systems, configured services, sent welcome materials, and established onboarding timeline.`;

//@ts-ignore
if (require.main === module) {
  const result = parseHMREF(testMarkdown);
  console.log(JSON.stringify(result, null, 2));
}

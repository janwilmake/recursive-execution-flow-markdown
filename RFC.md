# RFC: Hierarchical Markdown for Recursive Execution Flows (HMREF)

## Abstract

This RFC proposes a standardized markdown format using blockquote nesting to represent hierarchical execution flows in distributed systems, AI agent workflows, and recursive processes. The format enables natural language representation of nested logic gates where workers, agents, or humans can operate as independent microservices within a larger workflow structure. The specification supports both sequential execution and dependency-aware parallel processing while maintaining human readability and markdown compatibility.

## Motivation

### Current Challenges

1. **Workflow Visualization**: Existing workflow formats (YAML, JSON, XML) are machine-readable but lack human intuitive understanding of hierarchical relationships
2. **Real-time Execution Tracking**: No standard exists for streaming hierarchical execution progress in a human-readable format
3. **Agent Coordination**: AI agent systems need a simple way to represent nested tool calls and sub-agent interactions
4. **Microservice Orchestration**: Complex distributed systems require intuitive visualization of service dependencies and execution flows

### Design Goals

- **Human Readable**: Natural language representation that non-technical stakeholders can understand
- **Machine Parseable**: Structured enough for automated processing and execution engines
- **Streaming Compatible**: Supports real-time progress updates and live execution monitoring
- **Dependency Aware**: Represents execution dependencies while allowing parallel processing optimization
- **Tool Agnostic**: Works across different execution engines, AI frameworks, and orchestration systems

## Specification

### Core Syntax

#### Level 0: Root Headers

```markdown
# Primary Workflow Component
```

#### Level N: Nested Components

```markdown
> # Level 1 Component
>
> > # Level 2 Component
> >
> > > # Level 3 Component
```

### Execution Rules

1. **Nesting Constraint**: A deeply nested component cannot execute before its parent component has been initiated.
2. **Execution Order**: Components at the same nesting level can execute in parallel unless dependencies exist. If dependencies aren't known, sequential execution must be guaranteed to be possible. How dependencies are defined is up to the implementation and is not part of this RFC.
3. **Content Streaming**: Component content can be streamed word-by-word while maintaining proper indentation
4. **Line Wrapping**: Content automatically wraps at 80 characters while preserving blockquote structure

### Component Types

#### Workers (Automated Agents)

```markdown
> **service_name** (e.g., document_processor, api_gateway)
```

#### Humans (Manual Tasks)

```markdown
> **role_human** (e.g., legal_review_human, ceo_approval_human)
```

#### Tools/APIs

```markdown
> **GET** api.example.com/endpoint/{pathparam}?query={query}
```

### Status Indicators (Optional)

```markdown
> ✅ **completed**
> 🟠 **in_progress**  
> ❌ **failed**
> 🚫 **cancelled**
> ⏳ **pending**
```

### Thought Process (Optional)

```markdown
<details>
<summary><strong>Think:</strong> Reasoning behind this step</summary>

Detailed explanation of why this component is necessary and how it fits into the larger workflow.

</details>
```

## Implementation Notes

### Parsing Algorithm

1. Count leading `>` characters to determine nesting level
2. Extract component headers using `# ComponentName` pattern
3. Preserve content indentation by maintaining blockquote depth
4. Support streaming by processing incomplete lines

### Dependency Resolution

- **Explicit Dependencies**: Use natural language or structured annotations
- **Implicit Dependencies**: Derived from nesting structure
- **Parallel Execution**: Same-level components without cross-dependencies

### Engine Requirements

- Stream-compatible text processing
- Blockquote-aware line wrapping at 80 characters
- Support for partial content updates
- Markdown rendering compatibility

## Examples

### Example 1: AI Agent with Tool Calls

```markdown
# Customer Support AI Agent

Analyzing customer inquiry about billing discrepancy...

> **billing_system_query** (Database lookup)
>
> - Input: Customer ID, Date range
> - Output: Transaction history, account status
>
> Found multiple transactions requiring verification. Need to check with payment processor.
>
> > **payment_processor_api** (External API)
> >
> > - GET payment-api.com/transactions/{transaction_id}
> > - Output: Detailed payment status
> >
> > Transaction shows successful completion but refund was processed twice.
> >
> > > **fraud_detection_service** (ML Service)
> > >
> > > - Input: Transaction pattern analysis
> > > - Output: Risk assessment
> > >
> > > No fraudulent activity detected. System error caused duplicate refund.

Customer issue resolved: Duplicate refund will be reversed within 24 hours.
```

### Example 2: Microservice Orchestration

```markdown
# E-commerce Order Processing

## Order Validation Phase

> **inventory_service**
>
> - Check product availability
> - Reserve items for 15 minutes
>
> All items available. Proceeding to payment processing.
>
> > **payment_gateway**
> >
> > - Process credit card transaction
> > - Generate payment confirmation
> >
> > Payment successful. Initiating fulfillment workflow.
> >
> > > **warehouse_management_system**
> > >
> > > - Generate pick list
> > > - Assign to warehouse worker
> > >
> > > > **warehouse_worker_human** (Warehouse Staff)
> > > >
> > > > - Physical item picking
> > > > - Quality check
> > > > - Package preparation
> > >
> > > Items picked and packaged. Ready for shipping.
> >
> > > **shipping_service**
> > >
> > > - Calculate shipping options
> > > - Generate shipping labels
> > >
> > > Express shipping selected. Tracking number: 1Z999AA1234567890

## Notification Phase

> **email_service**
>
> - Send order confirmation
> - Include tracking information
>
> > **sms_service** (Optional)
> >
> > - Send SMS notification if opted in
```

### Example 3: Legal Document Automation

```markdown
# Automated Contract Generation Workflow

<details>
<summary><strong>Think:</strong> Contract automation requires legal compliance</summary>

Document generation must follow legal standards while maintaining efficiency. Human oversight is required for complex terms and final approval.

</details>

> **template_selection_engine**
>
> - Input: Contract type, jurisdiction, complexity level
> - Output: Appropriate legal template
>
> Standard service agreement template selected for California jurisdiction.
>
> > **clause_generation_ai**
> >
> > - Generate custom clauses based on business requirements
> > - Ensure legal language compliance
> >
> > <details>
> > <summary><strong>Think:</strong> AI-generated clauses need human review</summary>
> >
> > While AI can generate legally sound language, complex business terms require attorney review to ensure they meet specific client needs.
> >
> > </details>
> >
> > > **legal_review_human** (Corporate Attorney)
> > >
> > > - Review AI-generated clauses
> > > - Modify terms for client-specific requirements
> > > - Ensure regulatory compliance
> > >
> > > Terms approved with minor modifications to liability clauses.
> >
> > > **client_approval_human** (Client Legal Team)
> > >
> > > - Final review of complete contract
> > > - Approval for execution
> >
> > Contract approved for digital signature process.

> **digital_signature_platform**
>
> - Generate signature requests
> - Send to all parties
> - Track completion status

Contract execution workflow initiated.
```

### Example 4: Streaming Execution Monitor

```markdown
# Real-time Data Pipeline Execution

## Data Ingestion Phase (Status: ✅)

> ✅ **data_source_connector** (Apache Kafka)
>
> - Connected to 15 data sources
> - Processing 10,000 events/second
> - No connection errors
>
> > ✅ **data_validation_service**
> >
> > - Schema validation: 100% pass rate
> > - Data quality checks: 99.8% pass rate
> > - Anomaly detection: 2 minor anomalies flagged

## Data Processing Phase (Status: 🟠)

> 🟠 **stream_processor** (Apache Spark)
>
> - Processing batch 1,247 of 2,000
> - Current throughput: 8,500 records/second
> - Estimated completion: 14 minutes
>
> > ⏳ **ml_feature_extraction** (TensorFlow)
> >
> > - Waiting for stream processor to reach checkpoint
> > - Model loaded and ready
> >
> > > ⏳ **model_inference_service**
> > >
> > > - GPU clusters warmed up
> > > - Batch size optimized for current load

## Data Storage Phase (Status: ⏳)

> ⏳ **database_writer** (PostgreSQL)
>
> - Connection pool ready
> - Waiting for processed data
>
> > ⏳ **cache_updater** (Redis)
> >
> > - Cache warming in progress
> > - 45% complete
```

### Example 5: Human-AI Collaborative Workflow

```markdown
# Content Marketing Campaign Creation

## Research Phase

The campaign needs to target millennials interested in sustainable technology.

> **market_research_ai**
>
> - Analyze competitor campaigns
> - Identify trending topics
> - Generate audience insights
>
> Key findings: Sustainability messaging performs 40% better when combined with cost-saving benefits.
>
> > **trend_analysis_human** (Marketing Strategist)
> >
> > - Review AI findings
> > - Add industry expertise
> > - Validate assumptions
> >
> > AI analysis confirmed. Adding insight: Q4 budget season drives enterprise interest.

## Content Creation Phase

> **content_ai** (GPT-4)
>
> - Generate blog post outlines
> - Create social media copy variations
> - Draft email sequences
>
> > **creative_review_human** (Creative Director)
> >
> > - Review tone and brand alignment
> > - Enhance creative elements
> > - Ensure message consistency
> >
> > Content approved with minor tone adjustments for authenticity.
> >
> > > **seo_optimization_ai**
> > >
> > > - Keyword optimization
> > > - Meta description generation
> > > - Internal linking suggestions
> >
> > > **legal_compliance_human** (Legal Review)
> > >
> > > - Verify claims accuracy
> > > - Ensure regulatory compliance
> > > - Approve for publication

## Distribution Phase

> **social_media_scheduler**
>
> - Schedule across platforms
> - Optimize posting times
> - Set up engagement monitoring
>
> > **influencer_outreach_human** (Partnerships Manager)
> >
> > - Contact relevant influencers
> > - Negotiate collaboration terms
> > - Coordinate content timing

Campaign ready for launch. All components aligned for maximum impact.
```

### Example 6: Error Handling and Cancellation

```markdown
# Form Submission Workflow (Status: ❌)

## Data Collection Phase (Status: ✅)

> ✅ **form_validator**
>
> - Validate required fields
> - Check data formats
> - Sanitize inputs
>
> All validation checks passed. Form data ready for approval.

## Approval Phase (Status: ❌)

> ❌ **approval_human** (Department Manager)
>
> - Review form submission
> - Approve or reject request
>
> Error: User not available - out of office until next week.
>
> > 🚫 **notification_service**
> >
> > - Send approval request email
> > - Set reminder notifications
> >
> > Cancelled: Cannot proceed without human approval.
> >
> > > 🚫 **database_update**
> > >
> > > - Update form status
> > > - Log approval decision
> > >
> > > Cancelled: No approval decision to record.
```

## Use Cases

### 1. Streaming Agentic Execution

- **Real-time AI agent monitoring**: Watch agents call tools and sub-agents live
- **Debug complex agent interactions**: Trace execution paths through nested calls
- **Performance optimization**: Identify bottlenecks in agent workflows

### 2. Hierarchical Workflow Status

- **Project management**: Track complex project dependencies and progress
- **System health monitoring**: Visualize microservice call chains and health
- **Incident response**: Understand system component interactions during outages

### 3. Structured Tool Documentation

- **API documentation**: Show nested endpoint dependencies and call patterns
- **Workflow documentation**: Document complex business processes with tool interactions
- **Training materials**: Teach system architecture through executable examples

### 4. Natural Language Process Flow

- **Business process documentation**: Represent complex workflows in human-readable format
- **Compliance documentation**: Show audit trails and approval chains
- **Knowledge transfer**: Document institutional knowledge in accessible format

## Key Benefits

### For Developers

- **Unified Format**: Single format works across different systems and use cases
- **Debugging**: Easy to trace execution paths and identify issues
- **Documentation**: Self-documenting workflows that stay current with implementation

### For Operations Teams

- **Monitoring**: Real-time visibility into complex system interactions
- **Troubleshooting**: Clear representation of service dependencies and call chains
- **Capacity Planning**: Understand resource utilization patterns across services

### For Business Stakeholders

- **Transparency**: Non-technical stakeholders can understand system workflows
- **Process Optimization**: Identify inefficiencies in business processes
- **Compliance**: Clear audit trails for regulatory requirements

### For AI/ML Teams

- **Agent Development**: Design and test complex multi-agent systems
- **Tool Integration**: Manage nested tool calls and dependencies
- **Explainability**: Provide clear explanations of AI decision-making processes

## Future Extensions

### Enhanced Metadata

```markdown
> **service_name** {timeout: 30s, retry: 3, parallel: true}
```

### Conditional Logic

```markdown
> **payment_processor** (if payment_required)
```

### Resource Requirements

```markdown
> **ml_inference** [gpu: 1, memory: 8GB, cpu: 4 cores]
```

### Performance Metrics

```markdown
> **api_service** (avg_latency: 150ms, success_rate: 99.9%)
```

## Conclusion

HMREF provides a standardized, human-readable format for representing complex hierarchical execution flows. Its markdown-native approach ensures broad compatibility while its streaming capabilities enable real-time monitoring of distributed systems. The format's flexibility supports diverse use cases from AI agent coordination to microservice orchestration, making it a valuable tool for modern distributed system development and operations.

The specification balances simplicity with expressiveness, allowing teams to adopt it incrementally while providing room for future enhancements. Its natural language foundation ensures that workflows remain comprehensible to both technical and non-technical stakeholders, promoting better collaboration and understanding across organizations.

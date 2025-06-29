# Automated Angel Investment Setup Workflow

## Initial Setup Phase

<details>
<summary><strong>Think:</strong> Need to establish legal foundation first</summary>

The company needs a proper legal entity before any investment activities. This involves choosing the right jurisdiction (usually Delaware for startups) and ensuring all corporate formalities are met.

</details>

> **legal_entity_formation_service** (e.g., Clerky, LegalZoom)
>
> - Input: Company name, state of incorporation, founders info
> - Output: Articles of incorporation, EIN, corporate bylaws
>
> <details>
> <summary><strong>Think:</strong> Corporate entity established, now need banking infrastructure</summary>
>
> With legal entity formed, we can now open business accounts. Modern startup-friendly banks like Mercury offer streamlined onboarding for new corporations.
>
> </details>
>
> > **bank_account_setup_service** (e.g., Mercury, Silicon Valley Bank)
> >
> > - Input: Incorporation documents, EIN
> > - Output: Corporate bank account
>
> <details>
> <summary><strong>Think:</strong> Need to track ownership from day one</summary>
>
> Cap table management is critical from the start. Even before outside investment, founders need proper documentation of their equity splits and vesting schedules.
>
> </details>
>
> > **cap_table_management_platform** (e.g., Carta, Pulley)
> >
> > - Input: Founder equity split, incorporation docs
> > - Output: Initial cap table, founder stock certificates

## Legal Documentation Phase

<details>
<summary><strong>Think:</strong> Investment structure needs to be legally sound</summary>

The legal documentation phase is crucial - this determines the rights and obligations of all parties. SAFE notes are popular for their simplicity, but convertible notes might be better for certain scenarios.

</details>

> **document_automation_platform** (e.g., Clerky, Cooley GO)
>
> <details>
> <summary><strong>Think:</strong> Need to select appropriate investment instrument</summary>
>
> SAFE notes are simpler and founder-friendly, while convertible notes provide more investor protections. The choice depends on negotiating position and investor preferences.
>
> </details>
>
> > **template_selection_tool**
> >
> > - Input: Investment type (SAFE vs convertible note), investment amount
> > - Output: Appropriate document templates
>
> <details>
> <summary><strong>Think:</strong> Templates need customization for specific deal terms</summary>
>
> Standard templates are a starting point, but each deal has unique terms like valuation caps, discount rates, and pro rata rights that need to be properly configured.
>
> </details>
>
> > **document_generation_engine**
> >
> > - Input: Company details, investor details, terms (valuation cap, discount rate)
> > - Output: Draft SAFE/convertible note agreements
> >
> > <details>
> > <summary><strong>Think:</strong> Legal review is essential despite automation</summary>
> >
> > Automated document generation is helpful but legal review ensures compliance with securities laws and protects both parties from unforeseen issues.
> >
> > </details>
> >
> > > **legal_review_human** (Attorney)
> > >
> > > - Input: Draft agreements
> > > - Output: Reviewed and customized legal documents
> > >
> > > <details>
> > > <summary><strong>Think:</strong> Founders need to understand what they're signing</summary>
> > >
> > > Even with attorney review, founders should understand the implications of the terms, especially around dilution, liquidation preferences, and governance rights.
> > >
> > > </details>
> > >
> > > > **founder_review_human** (CEO/Founders)
> > > >
> > > > - Input: Attorney-reviewed documents
> > > > - Output: Approved final documents

## Investor Onboarding Phase

<details>
<summary><strong>Think:</strong> Securities compliance requires proper investor verification</summary>

Before accepting investment, we need to verify investors meet legal requirements. This includes KYC/AML compliance and ensuring they qualify as accredited investors under SEC rules.

</details>

> **investor_management_platform** (e.g., AngelList, EquityZen)
>
> <details>
> <summary><strong>Think:</strong> KYC/AML is mandatory for financial compliance</summary>
>
> Know Your Customer and Anti-Money Laundering checks are required by law. Automated services can handle most standard cases efficiently.
>
> </details>
>
> > **kyc_automation_service**
> >
> > - Input: Investor personal/entity information
> > - Output: Completed KYC/AML verification
>
> <details>
> <summary><strong>Think:</strong> Accredited investor status is crucial for exemption compliance</summary>
>
> Under Regulation D, companies can only accept investment from accredited investors without expensive SEC registration. Verification is legally required.
>
> </details>
>
> > **accreditation_verification_service**
> >
> > - Input: Investor financial documents
> > - Output: Accredited investor status confirmation
> >
> > <details>
> > <summary><strong>Think:</strong> Complex cases need human judgment</summary>
> >
> > Some investor situations don't fit standard verification patterns - entities, trusts, or international investors may need manual review.
> >
> > </details>
> >
> > > **compliance_officer_human** (if required)
> > >
> > > - Input: Edge cases or complex verification scenarios
> > > - Output: Manual verification approval

## Execution Phase

<details>
<summary><strong>Think:</strong> Time to execute the actual investment transaction</summary>

With all documentation and verification complete, we can now execute the investment. Digital signatures and electronic fund transfers make this process efficient and secure.

</details>

> **digital_signature_platform** (e.g., DocuSign, HelloSign)
>
> - Input: Final investment documents, investor and founder contact info
> - Output: Executed investment agreements
>
> <details>
> <summary><strong>Think:</strong> Funds transfer needs to be secure and traceable</summary>
>
> Investment funds should be transferred through formal banking channels with proper documentation for accounting and legal purposes.
>
> </details>
>
> > **payment_processing_service** (e.g., wire transfer, ACH)
> >
> > - Input: Investment amount, company bank details
> > - Output: Funds transferred to company account
> >
> > <details>
> > <summary><strong>Think:</strong> Investment must be properly recorded in company books</summary>
> >
> > The investment transaction needs to be recorded correctly in the company's financial records, both for tax purposes and future due diligence.
> >
> > </details>
> >
> > > **bookkeeper_human** (or accounting software)
> > >
> > > - Input: Investment transaction details
> > > - Output: Updated financial records

## Post-Investment Administration

<details>
<summary><strong>Think:</strong> Cap table updates and investor relations are ongoing responsibilities</summary>

Once investment is complete, the company needs to update its cap table, onboard the investor for ongoing communications, and maintain the relationship for future rounds.

</details>

> **cap_table_management_platform** (updated)
>
> - Input: Executed investment documents, payment confirmation
> - Output: Updated cap table with new investor stakes
>
> <details>
> <summary><strong>Think:</strong> Investors need ongoing communication and updates</summary>
>
> New investors should receive welcome communications and be set up for regular company updates. This maintains good relationships for future funding rounds.
>
> </details>
>
> > **investor_relations_platform** (e.g., Carta, Update notifications)
> >
> > - Input: Investment completion data
> > - Output: Automated investor onboarding communications
> >
> > <details>
> > <summary><strong>Think:</strong> Personal relationships matter in angel investing</summary>
> >
> > While much can be automated, personal relationship management with investors is crucial for ongoing support, future funding, and strategic guidance.
> >
> > </details>
> >
> > > **founder_human** (CEO)
> > >
> > > - Input: Investment milestone achievement
> > > - Output: Personal investor relationship management

## Compliance & Filing Phase

<details>
<summary><strong>Think:</strong> Regulatory compliance is mandatory after investment</summary>

Securities regulations require specific filings after completing an investment round. Form D filing with the SEC is typically required within 15 days of the first sale.

</details>

> **regulatory_filing_service** (e.g., Form D filing)
>
> - Input: Investment details, investor count
> - Output: SEC Form D filing
>
> <details>
> <summary><strong>Think:</strong> State-level requirements vary by jurisdiction</summary>
>
> Beyond federal requirements, states may have their own filing requirements and fees. Some states require notice filings or additional documentation.
>
> </details>
>
> > **state_filing_automation**
> >
> > - Input: Investment documents, state requirements
> > - Output: Required state-level filings and notifications

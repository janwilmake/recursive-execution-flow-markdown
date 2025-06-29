# Automated Angel Investment Setup Workflow

## Initial Setup Phase

The company needs a proper legal entity before any investment activities. This involves choosing the right jurisdiction (usually Delaware for startups) and ensuring all corporate formalities are met.

> **legal_entity_formation_service** (e.g., Clerky, LegalZoom)
>
> - Input: Company name, state of incorporation, founders info
> - Output: Articles of incorporation, EIN, corporate bylaws
>
> With legal entity formed, we can now open business accounts. Modern startup-friendly banks like Mercury offer streamlined onboarding for new corporations.
>
> > **bank_account_setup_service** (e.g., Mercury, Silicon Valley Bank)
> >
> > - Input: Incorporation documents, EIN
> > - Output: Corporate bank account
>
> Cap table management is critical from the start. Even before outside investment, founders need proper documentation of their equity splits and vesting schedules.
>
> > **cap_table_management_platform** (e.g., Carta, Pulley)
> >
> > - Input: Founder equity split, incorporation docs
> > - Output: Initial cap table, founder stock certificates

## Legal Documentation Phase

The legal documentation phase is crucial - this determines the rights and obligations of all parties. SAFE notes are popular for their simplicity, but convertible notes might be better for certain scenarios.

> **document_automation_platform** (e.g., Clerky, Cooley GO)
>
> SAFE notes are simpler and founder-friendly, while convertible notes provide more investor protections. The choice depends on negotiating position and investor preferences.
>
> > **template_selection_tool**
> >
> > - Input: Investment type (SAFE vs convertible note), investment amount
> > - Output: Appropriate document templates
>
> Standard templates are a starting point, but each deal has unique terms like valuation caps, discount rates, and pro rata rights that need to be properly configured.
>
> > **document_generation_engine**
> >
> > - Input: Company details, investor details, terms (valuation cap, discount rate)
> > - Output: Draft SAFE/convertible note agreements
> >
> > Automated document generation is helpful but legal review ensures compliance with securities laws and protects both parties from unforeseen issues.
> >
> > > **legal_review_human** (Attorney)
> > >
> > > - Input: Draft agreements
> > > - Output: Reviewed and customized legal documents
> > >
> > > Even with attorney review, founders should understand the implications of the terms, especially around dilution, liquidation preferences, and governance rights.
> > >
> > > > **founder_review_human** (CEO/Founders)
> > > >
> > > > - Input: Attorney-reviewed documents
> > > > - Output: Approved final documents

## Investor Onboarding Phase

Before accepting investment, we need to verify investors meet legal requirements. This includes KYC/AML compliance and ensuring they qualify as accredited investors under SEC rules.

> **investor_management_platform** (e.g., AngelList, EquityZen)
>
> Know Your Customer and Anti-Money Laundering checks are required by law. Automated services can handle most standard cases efficiently.
>
> > **kyc_automation_service**
> >
> > - Input: Investor personal/entity information
> > - Output: Completed KYC/AML verification
>
> Under Regulation D, companies can only accept investment from accredited investors without expensive SEC registration. Verification is legally required.
>
> > **accreditation_verification_service**
> >
> > - Input: Investor financial documents
> > - Output: Accredited investor status confirmation
> >
> > Some investor situations don't fit standard verification patterns - entities, trusts, or international investors may need manual review.
> >
> > > **compliance_officer_human** (if required)
> > >
> > > - Input: Edge cases or complex verification scenarios
> > > - Output: Manual verification approval

## Execution Phase

With all documentation and verification complete, we can now execute the investment. Digital signatures and electronic fund transfers make this process efficient and secure.

> **digital_signature_platform** (e.g., DocuSign, HelloSign)
>
> - Input: Final investment documents, investor and founder contact info
> - Output: Executed investment agreements
>
> Investment funds should be transferred through formal banking channels with proper documentation for accounting and legal purposes.
>
> > **payment_processing_service** (e.g., wire transfer, ACH)
> >
> > - Input: Investment amount, company bank details
> > - Output: Funds transferred to company account
> >
> > The investment transaction needs to be recorded correctly in the company's financial records, both for tax purposes and future due diligence.
> >
> > > **bookkeeper_human** (or accounting software)
> > >
> > > - Input: Investment transaction details
> > > - Output: Updated financial records

## Post-Investment Administration

Once investment is complete, the company needs to update its cap table, onboard the investor for ongoing communications, and maintain the relationship for future rounds.

> **cap_table_management_platform** (updated)
>
> - Input: Executed investment documents, payment confirmation
> - Output: Updated cap table with new investor stakes
>
> New investors should receive welcome communications and be set up for regular company updates. This maintains good relationships for future funding rounds.
>
> > **investor_relations_platform** (e.g., Carta, Update notifications)
> >
> > - Input: Investment completion data
> > - Output: Automated investor onboarding communications
> >
> > While much can be automated, personal relationship management with investors is crucial for ongoing support, future funding, and strategic guidance.
> >
> > > **founder_human** (CEO)
> > >
> > > - Input: Investment milestone achievement
> > > - Output: Personal investor relationship management

## Compliance & Filing Phase

Securities regulations require specific filings after completing an investment round. Form D filing with the SEC is typically required within 15 days of the first sale.

> **regulatory_filing_service** (e.g., Form D filing)
>
> - Input: Investment details, investor count
> - Output: SEC Form D filing
>
> Beyond federal requirements, states may have their own filing requirements and fees. Some states require notice filings or additional documentation.
>
> > **state_filing_automation**
> >
> > - Input: Investment documents, state requirements
> > - Output: Required state-level filings and notifications

# Automated Angel Investment Setup Workflow

## Initial Setup Phase

> **legal_entity_formation_service** (e.g., Clerky, LegalZoom)
>
> - Input: Company name, state of incorporation, founders info
> - Output: Articles of incorporation, EIN, corporate bylaws
>
> > **bank_account_setup_service** (e.g., Mercury, Silicon Valley Bank)
> >
> > - Input: Incorporation documents, EIN
> > - Output: Corporate bank account
>
> > **cap_table_management_platform** (e.g., Carta, Pulley)
> >
> > - Input: Founder equity split, incorporation docs
> > - Output: Initial cap table, founder stock certificates

## Legal Documentation Phase

> **document_automation_platform** (e.g., Clerky, Cooley GO)
>
> > **template_selection_tool**
> >
> > - Input: Investment type (SAFE vs convertible note), investment amount
> > - Output: Appropriate document templates
>
> > **document_generation_engine**
> >
> > - Input: Company details, investor details, terms (valuation cap, discount rate)
> > - Output: Draft SAFE/convertible note agreements
> >
> > > **legal_review_human** (Attorney)
> > >
> > > - Input: Draft agreements
> > > - Output: Reviewed and customized legal documents
> > >
> > > > **founder_review_human** (CEO/Founders)
> > > >
> > > > - Input: Attorney-reviewed documents
> > > > - Output: Approved final documents

## Investor Onboarding Phase

> **investor_management_platform** (e.g., AngelList, EquityZen)
>
> > **kyc_automation_service**
> >
> > - Input: Investor personal/entity information
> > - Output: Completed KYC/AML verification
>
> > **accreditation_verification_service**
> >
> > - Input: Investor financial documents
> > - Output: Accredited investor status confirmation
> >
> > > **compliance_officer_human** (if required)
> > >
> > > - Input: Edge cases or complex verification scenarios
> > > - Output: Manual verification approval

## Execution Phase

> **digital_signature_platform** (e.g., DocuSign, HelloSign)
>
> - Input: Final investment documents, investor and founder contact info
> - Output: Executed investment agreements
>
> > **payment_processing_service** (e.g., wire transfer, ACH)
> >
> > - Input: Investment amount, company bank details
> > - Output: Funds transferred to company account
> >
> > > **bookkeeper_human** (or accounting software)
> > >
> > > - Input: Investment transaction details
> > > - Output: Updated financial records

## Post-Investment Administration

> **cap_table_management_platform** (updated)
>
> - Input: Executed investment documents, payment confirmation
> - Output: Updated cap table with new investor stakes
>
> > **investor_relations_platform** (e.g., Carta, Update notifications)
> >
> > - Input: Investment completion data
> > - Output: Automated investor onboarding communications
> >
> > > **founder_human** (CEO)
> > >
> > > - Input: Investment milestone achievement
> > > - Output: Personal investor relationship management

## Compliance & Filing Phase

> **regulatory_filing_service** (e.g., Form D filing)
>
> - Input: Investment details, investor count
> - Output: SEC Form D filing
>
> > **state_filing_automation**
> >
> > - Input: Investment documents, state requirements
> > - Output: Required state-level filings and notifications

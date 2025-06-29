<!-- This defines a minimal way of a structure of hierarchical agents with structured input and output  -->

# Automated Angel Investment Setup Workflow

## Initial Setup Phase

The company needs a proper legal entity before any investment activities. This involves choosing the right jurisdiction (usually Delaware for startups) and ensuring all corporate formalities are met.

> **GET** clerky.com/api/incorporate/{company_name}/{state}?founders_info={founders_info}
>
> - `company_name` - The desired company name for incorporation
> - `state` - State of incorporation (typically Delaware)
> - `founders_info` - JSON object containing founder details and equity splits
>
> **Output:** Articles of incorporation, EIN, corporate bylaws
>
> With legal entity formed, we can now open business accounts. Modern startup-friendly banks like Mercury offer streamlined onboarding for new corporations.
>
> > **GET** mercury.com/api/account/setup?ein={ein}&incorporation_docs={incorporation_docs}
> >
> > - `ein` - Employer Identification Number from incorporation
> > - `incorporation_docs` - Digital copies of incorporation documents
> >
> > **Output:** Corporate bank account details, routing numbers
>
> Cap table management is critical from the start. Even before outside investment, founders need proper documentation of their equity splits and vesting schedules.
>
> > **GET** carta.com/api/captable/initialize?company_id={company_id}&founder_equity={founder_equity}
> >
> > - `company_id` - Company identifier from incorporation
> > - `founder_equity` - JSON object with founder equity allocations and vesting schedules
> >
> > **Output:** Initial cap table, founder stock certificates, vesting schedules

## Legal Documentation Phase

The legal documentation phase is crucial - this determines the rights and obligations of all parties. SAFE notes are popular for their simplicity, but convertible notes might be better for certain scenarios.

> **GET** clerky.com/api/documents/template/{investment_type}?amount={amount}&complexity={complexity}
>
> SAFE notes are simpler and founder-friendly, while convertible notes provide more investor protections. The choice depends on negotiating position and investor preferences.
>
> > - `investment_type` - Type of investment instrument (safe, convertible_note)
> > - `amount` - Investment amount in USD
> > - `complexity` - Complexity level (simple, standard, custom)
> >
> > **Output:** Appropriate document templates, term sheet templates
>
> Standard templates are a starting point, but each deal has unique terms like valuation caps, discount rates, and pro rata rights that need to be properly configured.
>
> > **GET** clerky.com/api/documents/generate/{template_id}?company_details={company_details}&investor_details={investor_details}&terms={terms}
> >
> > - `template_id` - Selected template identifier
> > - `company_details` - Company information including valuation and business details
> > - `investor_details` - Investor information and contact details
> > - `terms` - Investment terms including valuation cap, discount rate, pro rata rights
> >
> > **Output:** Draft SAFE/convertible note agreements, subscription agreements
> >
> > Automated document generation is helpful but legal review ensures compliance with securities laws and protects both parties from unforeseen issues.
> >
> > > **GET** legalreview.com/api/review/securities?documents={documents}&jurisdiction={jurisdiction}
> > >
> > > - `documents` - Generated legal documents for review
> > > - `jurisdiction` - Legal jurisdiction for compliance check
> > >
> > > **Output:** Reviewed legal documents, compliance notes, recommended changes
> > >
> > > Even with attorney review, founders should understand the implications of the terms, especially around dilution, liquidation preferences, and governance rights.
> > >
> > > > **GET** humanreview.com/api/founder/review?documents={documents}&explanation_level={explanation_level}
> > > >
> > > > - `documents` - Attorney-reviewed documents
> > > > - `explanation_level` - Level of explanation needed (basic, detailed, comprehensive)
> > > >
> > > > **Output:** Founder approval status, requested changes, understanding confirmation

## Investor Onboarding Phase

Before accepting investment, we need to verify investors meet legal requirements. This includes KYC/AML compliance and ensuring they qualify as accredited investors under SEC rules.

> **GET** angellist.com/api/investor/onboard/{investor_id}?company_id={company_id}
>
> Know Your Customer and Anti-Money Laundering checks are required by law. Automated services can handle most standard cases efficiently.
>
> > - `investor_id` - Unique investor identifier
> > - `company_id` - Company identifier for the investment
> >
> > **Output:** Investor profile, onboarding status, required documentation list
>
> > **GET** kycverify.com/api/verify/{investor_id}?document_types={document_types}
> >
> > - `investor_id` - Investor identifier for verification
> > - `document_types` - Required document types for verification
> >
> > **Output:** KYC/AML verification status, compliance score, flagged items
>
> Under Regulation D, companies can only accept investment from accredited investors without expensive SEC registration. Verification is legally required.
>
> > **GET** accreditationverify.com/api/verify/{investor_id}?financial_docs={financial_docs}&entity_type={entity_type}
> >
> > - `investor_id` - Investor identifier
> > - `financial_docs` - Financial documentation for verification
> > - `entity_type` - Type of investor (individual, entity, trust)
> >
> > **Output:** Accredited investor status, verification certificate, expiration date
> >
> > Some investor situations don't fit standard verification patterns - entities, trusts, or international investors may need manual review.
> >
> > > **GET** complianceofficer.com/api/manual-review/{case_id}?complexity={complexity}&urgency={urgency}
> > >
> > > - `case_id` - Unique case identifier for manual review
> > > - `complexity` - Complexity level of the verification case
> > > - `urgency` - Timeline requirements for review completion
> > >
> > > **Output:** Manual verification decision, detailed reasoning, additional requirements

## Execution Phase

With all documentation and verification complete, we can now execute the investment. Digital signatures and electronic fund transfers make this process efficient and secure.

> **GET** docusign.com/api/envelope/create?documents={documents}&signers={signers}&signing_order={signing_order}
>
> - `documents` - Final investment documents ready for signature
> - `signers` - List of required signers with contact information
> - `signing_order` - Order in which parties should sign documents
>
> **Output:** Signed investment agreements, signature certificates, completion timestamps
>
> Investment funds should be transferred through formal banking channels with proper documentation for accounting and legal purposes.
>
> > **GET** wiretransfer.com/api/transfer/initiate?amount={amount}&source_account={source_account}&destination_account={destination_account}&reference={reference}
> >
> > - `amount` - Investment amount to transfer
> > - `source_account` - Investor's bank account details
> > - `destination_account` - Company's bank account details
> > - `reference` - Transaction reference linking to investment documents
> >
> > **Output:** Transfer confirmation, transaction ID, expected settlement date
> >
> > The investment transaction needs to be recorded correctly in the company's financial records, both for tax purposes and future due diligence.
> >
> > > **GET** bookkeeping.com/api/transaction/record?amount={amount}&transaction_type={transaction_type}&reference_docs={reference_docs}
> > >
> > > - `amount` - Transaction amount
> > > - `transaction_type` - Type of transaction (equity_investment)
> > > - `reference_docs` - Supporting documentation for the transaction
> > >
> > > **Output:** Updated financial records, journal entries, tax documentation

## Post-Investment Administration

Once investment is complete, the company needs to update its cap table, onboard the investor for ongoing communications, and maintain the relationship for future rounds.

> **GET** carta.com/api/captable/update/{company_id}?investment_details={investment_details}&new_shares={new_shares}
>
> - `company_id` - Company identifier
> - `investment_details` - Details of completed investment
> - `new_shares` - New share issuance information
>
> **Output:** Updated cap table, new investor certificates, dilution calculations
>
> New investors should receive welcome communications and be set up for regular company updates. This maintains good relationships for future funding rounds.
>
> > **GET** investorrelations.com/api/onboard/{investor_id}?company_id={company_id}&communication_preferences={communication_preferences}
> >
> > - `investor_id` - New investor identifier
> > - `company_id` - Company identifier
> > - `communication_preferences` - Investor's preferred communication settings
> >
> > **Output:** Investor welcome package, communication setup, update schedule
> >
> > While much can be automated, personal relationship management with investors is crucial for ongoing support, future funding, and strategic guidance.
> >
> > > **GET** foundercommunication.com/api/relationship/initiate/{founder_id}/{investor_id}?investment_milestone={investment_milestone}
> > >
> > > - `founder_id` - CEO/Founder identifier
> > > - `investor_id` - Investor identifier
> > > - `investment_milestone` - Investment completion milestone
> > >
> > > **Output:** Relationship management plan, communication schedule, strategic guidance framework

## Compliance & Filing Phase

Securities regulations require specific filings after completing an investment round. Form D filing with the SEC is typically required within 15 days of the first sale.

> **GET** secfiling.com/api/formd/file?company_details={company_details}&investment_details={investment_details}&investor_count={investor_count}
>
> - `company_details` - Company information for SEC filing
> - `investment_details` - Investment round details
> - `investor_count` - Number of investors in the round
>
> **Output:** Filed Form D, SEC confirmation, filing receipt
>
> Beyond federal requirements, states may have their own filing requirements and fees. Some states require notice filings or additional documentation.
>
> > **GET** statefiling.com/api/requirements/{state}?investment_type={investment_type}&amount={amount}
> >
> > - `state` - State jurisdiction for filing requirements
> > - `investment_type` - Type of investment instrument
> > - `amount` - Investment amount
> >
> > **Output:** State filing requirements, required forms, filing fees, deadlines

"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DownloadAppBanner from "@/components/department/DownloadAppBanner";
import SupportNavigation from "@/components/support/SupportNavigation";
import AccordionSection from "@/components/support/AccordionSection";
import FeedbackPrompt from "@/components/support/FeedbackPrompt";
import { SupportNavLink, SupportSection } from "@/types/support";
import { supportPageStyles } from "@/constants/supportPageStyles";

const sections: SupportSection[] = [
  {
    title: "FARFETCH MODERN SLAVERY STATEMENT 2022",
    content: (
      <>
        <p className="mb-3 text-base">
          This statement is made by FARFETCH UK Limited (hereinafter referred to
          as the “Company” or “FARFETCH”) pursuant to Section 54 of the Modern
          Slavery Act 2015 and comprises the Company’s slavery and human
          trafficking statement for the financial year ending 31 December 2022.
        </p>
        <p className="mb-3 text-base">
          At FARFETCH, our values are at the heart of everything we do and we use
          them as a guide to make decisions about what feels right for our
          business, our people, our customers and the partners we work with. One
          of our core values is ‘Be Human’, which means we look after other
          people, we embrace diversity and we help others to be successful. Our
          approach to the issue of Modern Slavery speaks to this value.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          FARFETCH Marketplace
        </h2>
        <p className="mb-3 text-base">
          Our mission is to be the global platform for good in luxury fashion,
          connecting creators, curators and consumers.
        </p>
        <p className="mb-3 text-base">
          The FARFETCH Marketplace is the first and largest application built on
          our platform. As of the end of Q1 2022, the FARFETCH Marketplace
          connected consumers in 190 countries to nearly 1,400 luxury sellers.
          Our Marketplace model and the aggregation of luxury sellers requires us
          to build and nurture relationships with hundreds of brands and
          boutiques from across the world.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Positively FARFETCH
        </h2>
        <p className="mb-3 text-base">
          In December 2020, we launched our long-term 2030 sustainability goals.
          These build on 2019’s ‘Positively FARFETCH’ strategy and the host of
          initiatives launched under that program, including ‘The Conscious
          Collection’, ‘Fashion Footprint Tool’, the ‘FARFETCH Second Life’ and
          ‘FARFETCH Refresh’.
        </p>
        <p className="mb-3 text-base">Our 2030 goals focus on four key areas:</p>
        <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
          <li>
            <strong>POSITIVELY CLEANER:</strong> To be ‘Climate Positive’: By
            2030, we will reduce our footprint in line with our validated
            near-term science-based targets while also taking action beyond our
            direct value chain, financing carbon mitigation initiatives to offset
            our yearly emissions, and supporting projects that sit outside our
            carbon boundary to achieve additional carbon mitigation equivalent to
            at least 10%+ of our yearly carbon footprint.
          </li>
          <li>
            <strong>POSITIVELY CONSCIOUS:</strong> To sell 100% ‘Conscious’
            products: Driving all revenues from products that are independently
            recognised or certified as being better for people, the planet or
            animals, and from services that enable positive change.
          </li>
          <li>
            <strong>POSITIVELY CIRCULAR:</strong> To be more ‘Circular’ than
            ‘Linear’: Selling more circular, low waste products or uses of
            circular services, than sales of products made in traditional, linear
            ways.
          </li>
          <li>
            <strong>POSITIVELY INCLUSIVE:</strong> To be a leader in ‘Conscious
            Inclusion’: Championing diversity and inclusion both in our workplace
            and the global fashion community, and broadening the customer
            offering and providing boutiques, department stores and brands with
            practical resources to support their own sustainability and
            inclusivity efforts.
          </li>
        </ul>
        <p className="mb-3 text-base">
          Together with our partner brands and boutiques, we want to revolutionise
          and reinvent the fashion industry for the future. And we strongly
          believe that the future for the fashion industry is positively cleaner,
          conscious, circular, and inclusive.
        </p>
        <p className="mb-3 text-base">
          You can see our full 2021 ESG Report{" "}
          <Link href="#" className="underline font-medium">
            here
          </Link>
        </p>
        <p className="mb-3 text-base">
          In 2020 we formed an Environmental, Social and Governance (ESG)
          Committee (the “Committee”) of the FARFETCH Board of Directors. The
          Committee is chaired by Stephanie Horton and also includes José Neves
          (our Founder, CEO and Chairman) and Dana Evan. Its mission is to
          oversee FARFETCH’s ESG strategies and policies such that FARFETCH
          becomes a leader in sustainable, ethical, and consciously inclusive and
          human centred business practices, whilst proactively addressing key
          ESG-related opportunities and risks, such as Modern Slavery, and
          responding appropriately to the concerns of all relevant stakeholders.
          Accordingly, the work of the Committee should help ensure that the
          Company policies and actions drive positive environmental, social and
          governance outcomes that foster the wellbeing of FARFETCH employees,
          customers, vendors, partners, shareholders and community.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Partner brands and Boutiques
        </h2>
        <p className="mb-3 text-base">
          At the core of our business are our partnerships with brands and
          boutiques and we take a collaborative approach to identifying risks and
          areas where we can work with our partners to build appropriate and
          effective solutions to combat modern slavery and protect workers’
          rights. We recognise that as a marketplace and platform we are uniquely
          placed to lead, encourage and support ethical purchasing practices in
          our partner brands and boutiques.
        </p>
        <p className="mb-3 text-base">
          Since 2019, FARFETCH has collaborated with Good on You, the leading
          sustainability rating platform for fashion, to identify more conscious
          brands on our platform through a credible and robust approach. Good on
          You evaluates more than 100 different widely-recognised standards,
          certifications and other criteria to provide simple,
          easy–to–understand sustainability ratings of fashion brands. These
          ratings fall under 3 key areas of concern for consumers:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
          <li>
            <strong>PEOPLE:</strong> Brands are assessed against their impact
            across the supply chain, which includes policies and practices on
            child labour, forced labour, worker safety and empowerment, gender
            equality and payment of a living wage.
          </li>
          <li>
            <strong>PLANET:</strong> Brands are assessed against their use of
            resources – such as energy, water and chemicals – and waste
            management performance, including any commitments to circular
            practices.
          </li>
          <li>
            <strong>ANIMAL:</strong> Brands are assessed against the use of
            animal products and their animal welfare policies. For example, the
            use of ‘mulesing–free’ wool is considered, as is whether and how the
            brand uses leather, or traces their animal materials to source.
          </li>
        </ul>
        <p className="mb-3 text-base">
          We prioritise the rating of all our direct partner brands - and
          reassess the performance of all brands included in our conscious
          collection every 18 months. By applying rigorous,
          independently-assessed criteria to what our customers are buying, we’re
          able to be transparent about the impact of brands and products on the
          environment, society and animal welfare.
        </p>
        <p className="mb-3 text-base">
          As of December 2022, over 270 brands sold on the Farfetch Marketplace
          achieved a high rating on Good on You, earning the Conscious label for
          all their products, an increase of 23% YoY. We also partnered with Good
          On You to develop a tool called Good Measures that we believe will help
          both our brand partners and the whole industry drive progress towards a
          more sustainable future for fashion. Launched in July 2022, Good
          Measures is an online hub that gives brands a comprehensive view of
          their sustainability performance, highlights strategic opportunities
          for improvement and provides a range of support to drive continuous
          progress. It brings together the leading standards, certifications
          systems, and transparent information included in the Good On You
          methodology.
        </p>
        <p className="mb-3 text-base">
          Our aim is to leverage these tools and related data to see trends in
          our portfolio and, most importantly, to provide strong guidance to our
          brands on how to improve their impact - whatever their size or stage of
          their ESG journey.
        </p>
        <p className="mb-3 text-base">
          By the end of 2022, 56 brands (30% of invited brands) had already
          activated their access and feedback has been positive. In 2023, we aim
          to increase the engagement with the tool to at least 300 brand
          partners.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Business Operations and ‘Non-Stock’ Procurement
        </h2>
        <p className="mb-3 text-base">
          We have numerous suppliers who support the running of our various
          business units including (but not limited to) logistics, office
          management, marketing, and technology.
        </p>
        <p className="mb-3 text-base">
          One key tool for supporting our suppliers is our ongoing partnership
          with EcoVadis. EcoVadis assesses suppliers’ strengths and opportunities
          across four key areas of ESG: labour and human rights, environmental
          impact (including GHG emissions and additional climate-related issues),
          business ethics, and sustainable procurement. In 2022, over 75% of our
          total procurement spend was with suppliers with an EcoVadis scorecard,
          this has increased from 65% in 2021.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Company Policies and Codes
        </h2>
        <p className="mb-3 text-base">
          Our Global Code of Business Conduct and Ethics (“Code”) is embedded
          with certain policies relating to human rights. This is communicated to
          all employees by FARFETCH (translated as necessary) and forms part of
          the employee onboarding process. 100% of our employees are assigned
          mandatory Ethics & Compliance training, as well as policy attestation
          requirements, including attesting to our Code. At FARFETCH we encourage
          our employees to speak up whenever they have something to say. Our
          Speak Up culture is our open door policy which allows and encourages
          employees and external stakeholders (including vendors and business
          partners) to always do the right thing, ask questions and report
          concerns. In an effort to maintain this Speak Up culture, we have five
          speak up channels, including two anonymous reporting channels - a
          hotline and online reporting portal which are available 24/7 globally
          for employees and external stakeholders to raise concerns and ask
          questions. This ensures a clear and, where legally permitted,
          confidential route for reporting any violations of the Code.
        </p>
        <p className="mb-3 text-base">
          We have a Vendor Code of Conduct (“Vendor Code”). Based on
          internationally recognised standards and principles, our Vendor Code
          sets forth the behaviours, standards and practices we expect from our
          vendors, their employees and subcontractors. Our Vendor Code addresses
          Human Rights and Modern Slavery. Our Vendor Code is built into our
          contracts with brands and partners. Additionally, our Procurement
          Vendor Creation Process requires all suppliers set up via an external
          online form to agree and accept our Vendor Code.
        </p>
        <p className="mb-3 text-base">
          Our Ethical Sourcing Policy outlines our expectations for all our
          partners and other suppliers to consistently provide an environment
          which protects their employees&apos; health and safety and basic human
          rights. All Partners and other vendors are expected to comply with
          their national employment laws and regulations with particular regard
          to: minimum age of employment, freely chosen employment, health and
          safety, freedom of association and the right to collective bargaining,
          no discrimination, no harsh or inhumane treatment, working hours, rates
          of pay and terms of employment.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Assessing Our Risks
        </h2>
        <p className="mb-3 text-base">
          We completed an ethics and compliance focused risk assessment in order
          to assess program effectiveness, identify gaps, and improve our
          program. The scope of this risk assessment included, among other
          things, our Vendor Code and third party risk management as a whole. The
          results of this assessment are being utilised in enhancing the overall
          strategy of our third party risk management program which we will
          enhance in 2023. We also began a risk based audit program with a third
          party provider for New Guards Group suppliers which we will continue to
          run at a regular cadence.
        </p>
        <p className="font-semibold">
          The FARFETCH Modern Slavery Statement 2022 was prepared by the General
          Counsel and the Director of Sustainability and approved by the Board of
          Directors of FARFETCH UK Limited on 7 June 2023.
        </p>
      </>
    ),
  },
  {
    title: "FARFETCH MODERN SLAVERY STATEMENT 2021",
    content: (
      <>
        <p className="mb-3 text-base">
          This statement is made by FARFETCH UK Limited (hereinafter referred to
          as the “Company” or “FARFETCH”) pursuant to section 54 of the Modern
          Slavery Act 2015 and comprises the Company’s slavery and human
          trafficking statement for the financial year ending 31 December 2021.
        </p>
        <p className="mb-3 text-base">
          At FARFETCH, our values are at the heart of everything we do and we use
          them as a guide to make decisions about what feels right for our
          business, our people, our customers and the partners we work with. One
          of our core values is ‘Be Human’, which means we look after other
          people, we embrace diversity and we help others to be successful. Our
          approach to the issue of Modern Slavery speaks to this value.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          FARFETCH Marketplace
        </h2>
        <p className="mb-3 text-base">
          Our mission is to be the global platform for good in luxury fashion,
          connecting creators, curators and consumers.
        </p>
        <p className="mb-3 text-base">
          The FARFETCH Marketplace is the first and largest application built on
          our platform. As of the end of Q1 2021, the FARFETCH Marketplace
          connected consumers in 190 countries to nearly 1,400 luxury sellers.
          Our Marketplace model and the aggregation of luxury sellers requires us
          to build and nurture relationships with hundreds of brands and
          boutiques from across the world.
        </p>
        <h2 className="text-xs font-semibold text-preto mb-4">
          Positively FARFETCH
        </h2>
        <p className="mb-3 text-base">
          In December 2020, we launched our long-term 2030 sustainability goals.
          These build on 2019’s ‘Positively FARFETCH’ strategy and the host of
          initiatives launched under that program, including ‘The Conscious
          Collection’, ‘Fashion Footprint Tool’, ‘Climate Conscious Delivery’ and
          the ‘FARFETCH Second Life’, ‘FARFETCH Donate’, and ‘FARFETCH Fix’
          service propositions.
        </p>
        <p className="mb-3">Our 2030 goals focus on four key areas:</p>
        <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
          <li>
          <strong> POSITIVELY CLEANER:</strong>  To be ‘Climate Positive’:
            Achieving Net Zero emissions by reducing our footprint in line with
            Science Based Targets, offsetting unavoidable emissions, and
            supporting our wider value chain (outside of our footprint boundary)
            to achieve additional carbon reductions.
          </li>
          <li>
           <strong>POSITIVELY CONSCIOUS:</strong>  To sell 100% ‘Conscious’
            products: Driving all revenues from products that are independently
            recognised or certified as being better for people, the planet or
            animals, and from services that enable positive change.
          </li>
          <li>
           <strong> POSITIVELY CIRCULAR:</strong>  To be more ‘Circular’ than
            ‘Linear’: Selling more circular, low waste products or uses of
            circular services, than sales of products made in traditional, linear
            ways.
          </li>
          <li>
            <strong>POSITIVELY INCLUSIVE:</strong> To be a leader in ‘Conscious
            Inclusion’. Championing diversity and inclusion both in our workplace
            and the global fashion community, and broadening the customer
            offering and providing boutiques, department stores and brands with
            practical resources to support their own sustainability and
            inclusivity efforts.
          </li>
        </ul>
        <p className="mb-3 text-base">
          Together with our partner brands and boutiques, we want to revolutionise
          and reinvent the fashion industry for the future. And we strongly
          believe that the future for the fashion industry is positively cleaner,
          conscious, circular, and inclusive.
        </p>
        <p className="mb-3 text-base">
          You can see our full 2021 ESG Report{" "}
          <Link href="#" className="underline font-medium">
            here
          </Link>
        </p>
        <p className="mb-3 text-base">
          In 2020 we formed an Environmental, Social and Governance (ESG)
          Committee (the “Committee”) of the FARFETCH Board of Directors. The
          Committee is chaired by Stephanie Horton and also includes José Neves
          (our Founder, CEO and Chairman) and Dana Evan. Its mission is to
          oversee FARFETCH’s ESG strategies and policies such that FARFETCH
          becomes a leader in sustainable, ethical, and consciously inclusive and
          human centered business practices, whilst proactively addressing key
          ESG-related opportunities and risks, such as Modern Slavery, and
          responding appropriately to the concerns of all relevant stakeholders.
          Accordingly, the work of the Committee should help ensure that the
          Company policies and actions drive positive environmental, social and
          governance outcomes that foster the wellbeing of FARFETCH employees,
          customers, vendors, partners, shareholders and community.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Partner brands and Boutiques
        </h2>
        <p className="mb-3 text-base">
          At the core of our business are our partnerships with brands and
          boutiques and we take a collaborative approach to identifying risks and
          areas where we can work with our partners to build appropriate and
          effective solutions to combat modern slavery and protect workers’
          rights. We recognise that as a marketplace and platform we are uniquely
          placed to lead, encourage and support ethical purchasing practices in
          our partner brands and boutiques.
        </p>
        <p className="mb-3 text-base">
          Since 2019, FARFETCH has collaborated with Good on You, the leading
          sustainability rating platform for fashion, to identify conscious
          brands on our platform through a credible and robust approach. Good on
          You evaluates more than 100 different widely-recognised standards,
          certifications and other criteria to provide simple,
          easy–to–understand sustainability ratings of fashion brands. These
          ratings fall under 3 key areas of concern for consumers:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
          <li>
            <strong>PEOPLE:</strong> Brands are assessed against their impact
            across the supply chain, which includes policies and practices on
            child labor, forced labor, worker safety and empowerment, gender
            equality and payment of a living wage.
          </li>
          <li>
            <strong>PLANET:</strong> Brands are assessed against their use of
            resources – such as energy, water and chemicals – and waste
            management performance, including any commitments to circular
            practices.
          </li>
          <li>
            <strong>ANIMAL:</strong> Brands are assessed against the use of
            animal products and their animal welfare policies. For example, the
            use of ‘mulesing–free’ wool is considered, as is whether and how the
            brand uses leather, or traces their animal materials to source.
          </li>
        </ul>
        <p className="mb-3 text-base">
          We prioritise the rating of all our direct partner brands - and
          reassess the performance of all brands included in our conscious
          collection every 18 months. By applying rigorous,
          independently-assessed criteria to what our customers are buying, we’re
          able to be transparent about the impact of brands and products on the
          environment, society and animal welfare.
        </p>
        <p className="mb-3 text-base">
          We are pleased that in 2021, over 1200 brands available on the FARFETCH
          Marketplace were rated using the Good On You methodology.
        </p>
        <p className="mb-3 text-base">
          Throughout 2021, we also partnered with Good On You to develop two tools
          that we believe will help both our brands partners and the whole
          Industry drive progress towards a more Conscious future. The first tool
          considers 13 priority indicators of the Good On You methodology, and
          runs an assessment to see how brands score against them. These
          indicators focus on the fundamental issues, ranging from labour rights
          to transparency. The second innovation is the launch of Good Measures -
          an online hub that gives brands a comprehensive view of their
          sustainability performance, highlights strategic opportunities for
          improvement and provides a range of support to drive continuous
          progress. It brings together the leading standards, certifications
          systems, and transparent information included in the Good On You
          methodology.
        </p>
        <p className="mb-3 text-base">
          Our aim is to leverage these tools and related data to see trends in
          our portfolio and, most importantly, to provide strong guidance to our
          brands on how to improve their impact - whatever their size or stage of
          their ESG journey. We look forward to launching these tools in 2022.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Business Operations and ‘Non-Stock’ Procurement
        </h2>
        <p className="mb-3 text-base">
          We have numerous suppliers who support the running of our various
          business units including (but not limited to) logistics, office
          management, marketing, and technology.
        </p>
        <p className="mb-3 tetx-base">
          One key tool for supporting our suppliers is our ongoing partnership
          with EcoVadis. EcoVadis assesses suppliers’ strengths and opportunities
          across four key areas of ESG: labour and human rights, environmental
          impact (including GHG emissions and additional climate-related issues),
          business ethics, and sustainable procurement
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Company Policies and Codes
        </h2>
        <p className="mb-3 text-base">
          Our Global Code of Business Conduct and Ethics (“Code”) is embedded
          with certain policies relating to human rights. This is communicated to
          all employees by FARFETCH (translated as necessary) and forms part of
          the employee onboarding process. 100% of our employees are assigned
          mandatory Ethics & Compliance training, as well as policy attestation
          requirements, including attesting to our Code. At FARFETCH we encourage
          our employees to speak up whenever they have something to say. Our
          Speak Up culture is our open door policy which allows and encourages
          employees and external stakeholders (including vendors and business
          partners) to always do the right thing, ask questions and report
          concerns. In an effort to maintain this Speak Up culture, we have five
          speak up channels, including two anonymous reporting channels - a
          hotline and online reporting portal which are available 24/7 globally
          for employees and external stakeholders to raise concerns and ask
          questions. This ensures a clear and, where legally permitted,
          confidential route for reporting any violations of the Code.
        </p>
        <p className="mb-3 text-base">
          We have a Vendor Code of Conduct (“Vendor Code”). Based on
          internationally recognised standards and principles, our Vendor Code
          sets forth the behaviours, standards and practices we expect from our
          vendors, their employees and subcontractors. Our Vendor Code addresses
          Human Rights and Modern Slavery. Our Vendor Code is built into our
          contracts with brands and partners. Additionally, our Procurement
          Vendor Creation Process requires all suppliers set up via an external
          online form to agree and accept our Vendor Code.
        </p>
        <p className="mb-3 text-base">
          Our Ethical Sourcing Policy outlines our expectations for all our
          partners and other suppliers to consistently provide an environment
          which protects their employees&apos; health and safety and basic human
          rights. All Partners and other vendors are expected to comply with
          their national employment laws and regulations with particular regard
          to: minimum age of employment, freely chosen employment, health and
          safety, freedom of association and the right to collective bargaining,
          no discrimination, no harsh or inhumane treatment, working hours, rates
          of pay and terms of employment.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Assessing Our Risks
        </h2>
        <p className="mb-3 text-base">
          In 2021, as part of our Enterprise Risk Management (ERM) framework, a
          new risk assessment cycle was conducted across FARFETCH to evaluate
          Company practices and identify any new risks or material changes in
          relation to identified risks, including those associated with ESG and
          modern slavery. This assessment included a dedicated risk workshop with
          the Group Executive Committee facilitated by the FARFETCH Risk team,
          with resultant Group level principal risks each being allocated to an
          Executive level owner. This output was formally presented to the Group
          Audit Committee who have overall responsibility for risk within
          FARFETCH and are given a formal quarterly update on the implementation
          of ERM across the group. Furthermore, as reported in 2020, the Global
          Risk Committee (GRC), a management level committee working alongside
          the Risk team, continues to act as an additional layer of assurance by
          verifying and monitoring risks on a bi-annual basis prior to Audit
          Committee review.
        </p>
        <p className="mb-3 text-base">
          In addition, we began scoping an ethics and compliance focused risk
          assessment in order to assess program effectiveness, identify gaps, and
          improve our program. The scope of this risk assessment includes, among
          other things, our Vendor Code and third party risk management as a
          whole. The results of this assessment will be utilised in enhancing the
          overall strategy of our third party risk management program.
        </p>
        <p className="font-semibold">
          The FARFETCH Modern Slavery Statement 2021 was prepared by the General
          Counsel and the Director of Sustainability and approved on behalf of
          the Board of Directors of FARFETCH UK Limited on 30 June 2022.
        </p>
      </>
    ),
  },
  {
    title: "FARFETCH MODERN SLAVERY STATEMENT 2020",
    content: (
      <>
        <p className="mb-3 text-base">
          This statement is made by FARFETCH UK Limited (hereinafter referred to
          as the “Company” or “FARFETCH”) pursuant to section 54 of the Modern
          Slavery Act 2015 and comprises the Company’s slavery and human
          trafficking statement for the financial year ending 31 December 2020.
        </p>
        <p className="mb-3 text-base">
          At FARFETCH, our values are at the heart of everything we do and we use
          them as a guide to make decisions about what feels right for our
          business, our people, our customers and the partners we work with. One
          of our core values is ‘Be Human’, which means we look after other
          people, we embrace diversity and we help others to be successful. Our
          approach to the issue of Modern Slavery speaks to this value.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          FARFETCH Marketplace
        </h2>
        <p className="mb-3 text-base">
          Our mission is to be the global platform for good in luxury fashion,
          connecting creators, curators and consumers.
        </p>
        <p className="mb-3 text-base">
          The FARFETCH Marketplace is the first and largest application built on
          our platform. As of the end of Q1 2021, the FARFETCH Marketplace
          connected consumers in 190 countries to nearly 1,400 luxury sellers.
          Our Marketplace model and the aggregation of luxury sellers requires us
          to build and nurture relationships with hundreds of brands and
          boutiques from across the world.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Positively FARFETCH
        </h2>
        <p className="mb-3 text-base">
          In December 2020, we launched our long-term 2030 sustainability goals.
          These build on 2019’s ‘Positively FARFETCH’ strategy and the host of
          initiatives launched under that program, including ‘The Conscious Edit’,
          ‘Fashion Footprint Tool’, ‘Climate Conscious Delivery’ and the
          ‘FARFETCH Second Life’ and ‘FARFETCH Donate’ service propositions.
        </p>
        <p className="mb-3">Our 2030 goals focus on four key areas:</p>
        <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
          <li>
            <strong>POSITIVELY CLEANER:</strong> To be ‘Climate Positive’:
            Achieving Net Zero emissions by reducing our footprint in line with
            Science Based Targets, offsetting unavoidable emissions, and
            supporting our wider value chain (outside of our footprint boundary)
            to achieve additional carbon reductions.
          </li>
          <li>
            <strong>POSITIVELY CONSCIOUS:</strong> To sell 100% ‘Conscious’
            products: Driving all revenues from products that are independently
            recognised or certified as being better for people, the planet or
            animals, and from services that enable positive change.
          </li>
          <li>
            <strong>POSITIVELY CIRCULAR:</strong> To be more ‘Circular’ than
            ‘Linear’: Selling more circular, low waste products or uses of
            circular services, than sales of products made in traditional, linear
            ways.
          </li>
          <li>
            <strong>POSITIVELY INCLUSIVE:</strong> To be a leader in ‘Conscious
            Inclusion’. Championing diversity and inclusion both in our workplace
            and the global fashion community, and broadening the customer
            offering and providing boutiques, department stores and brands with
            practical resources to support their own sustainability and
            inclusivity efforts.
          </li>
        </ul>
        <p className="mb-3 text-base">
          Together with our partner brands and boutiques, we want to revolutionise
          and reinvent the fashion industry for the future. And we strongly
          believe that the future for the fashion industry is positively cleaner,
          conscious, circular, and inclusive.
        </p>
        <p className="mb-3 text-base">
          You can see the progress we made in 2020{" "}
          <Link href="#" className="underline font-medium">
            here
          </Link>
          , and read our full ESG Report{" "}
          <Link href="#" className="underline font-medium">
            here
          </Link>
          .
        </p>
        <p className="mb-4">
          In 2020 we formed an Environmental, Social and Governance (ESG)
          Committee (the “Committee”) of the FARFETCH Board of Directors. The
          Committee is chaired by Stephanie Horton and also includes José Neves
          (our Founder, CEO and Chairman) and Dana Evan. Its mission is to
          oversee FARFETCH’s ESG strategies and policies such that FARFETCH
          becomes a leader in sustainable, ethical, and consciously inclusive and
          human centered business practices, whilst proactively addressing key
          ESG-related opportunities and risks, such as Modern Slavery, and
          responding appropriately to the concerns of all relevant stakeholders.
          Accordingly, the work of the Committee should help ensure that the
          Company policies and actions drive positive environmental, social and
          governance outcomes that foster the wellbeing of FARFETCH employees,
          customers, vendors, partners, shareholders and community.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Partner brands and Boutiques
        </h2>
        <p className="mb-4">
          At the core of our business are our partnerships with brands and
          boutiques and we take a collaborative approach to identifying risks and
          areas where we can work with our partners to build appropriate and
          effective solutions to combat modern slavery and protect workers’
          rights. We recognise that as a marketplace and platform we are uniquely
          placed to lead, encourage and support ethical purchasing practices in
          our partner brands and boutiques.
        </p>
        <p className="mb-4">
          Since 2019, FARFETCH has collaborated with Good on You, the leading
          sustainability rating platform for fashion, to identify conscious
          brands on our platform through a credible and robust approach. Good on
          You evaluates more than 100 different widely-recognised standards,
          certifications and other criteria to provide simple,
          easy–to–understand sustainability ratings of fashion brands. These
          ratings fall under 3 key areas of concern for consumers:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-6 mb-4">
          <li>
            <strong>PEOPLE:</strong> Brands are assessed against their impact
            across the supply chain, which includes policies and practices on
            child labor, forced labor, worker safety and empowerment, gender
            equality and payment of a living wage.
          </li>
          <li>
            <strong>PLANET:</strong> Brands are assessed against their use of
            resources – such as energy, water and chemicals – and waste
            management performance, including any commitments to circular
            practices.
          </li>
          <li>
            <strong>ANIMAL:</strong> Brands are assessed against the use of
            animal products and their animal welfare policies. For example, the
            use of ‘mulesing–free’ wool is considered, as is whether and how the
            brand uses leather, or traces their animal materials to source.
          </li>
        </ul>
        <p className="mb-4">
          We prioritise the rating of all our direct partner brands - and
          reassess the performance of all brands included in our conscious
          collection every 18 months. By applying rigorous,
          independently-assessed criteria to what our customers are buying, we’re
          able to be transparent about the impact of brands and products on the
          environment, society and animal welfare.
        </p>
        <p className="mb-4">
          Over 1000 of the brands on FARFETCH have been rated by Good on You.
        </p>
        <p className="mb-4">
          In 2020, Conscious product sales grew 3.4x faster than the marketplace
          average and contributed over 5% of Group GMV. We are committed to our
          goal of 100% conscious product by 2030.
        </p>
        <p className="mb-4">
          FARFETCH intends to utilise feedback from the Good on You ratings to
          encourage our Brands partners to improve practices, in line with the
          wider Positively FARFETCH strategy and 2030 goal of selling 100%
          Conscious product on site.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Business Operations and ‘Non-Stock’ Procurement
        </h2>
        <p className="mb-4">
          We have numerous suppliers who support the running of our various
          business units including (but not limited to) logistics, office
          management, marketing, and technology.
        </p>
        <p className="mb-4">
          A critical step in our approach to tackling modern slavery is to gain
          transparency on our suppliers’ sustainability performance. In 2020,
          FARFETCH engaged with EcoVadis, a global sustainability rating company
          that uses international standards, to conduct individual sustainability
          performance assessments of our key supply chain partners (outside our
          partner brands and boutiques). EcoVadis combines sustainability
          expertise and online tools that guide partners to more sustainable and
          ethical practices, with a particular focus on Labour & Human Rights.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Company Policies and Codes
        </h2>
        <p className="mb-4">
          Our Global Code of Business Conduct and Ethics (“Code”) is embedded
          with certain policies relating to human rights. This is communicated to
          all employees by FARFETCH (translated as necessary) and forms part of
          the employee contract process. 100% of our employees are assigned
          mandatory Ethics & Compliance training, as well as policy attestation
          requirements, including attesting to our Code. At FARFETCH we encourage
          our employees to speak up whenever they have something to say. Our
          Speak Up culture is our open door policy which allows and encourages
          employees and external stakeholders (including vendors and suppliers)
          to always do the right thing, ask questions and report concerns. In an
          effort to maintain this Speak Up culture, we have five speak up
          channels, including two anonymous reporting channels - a hotline and
          online reporting portal which are available 24/7 globally for employees
          and external stakeholders to raise concerns and ask questions. This
          ensures a clear and, where legally permitted, confidential route for
          reporting any violations of the Code.
        </p>
        <p className="mb-4">
          We have a Vendor Code of Conduct (“Vendor Code”). Based on
          internationally recognised standards and principles, our Vendor Code
          sets forth the behaviours, standards and practices we expect from our
          vendors, their employees and subcontractors. Our Vendor Code addresses
          Human Rights and Modern Slavery.
        </p>
        <p className="mb-4">
          Our Ethical Sourcing Policy outlines our expectations for all our
          partners and other suppliers to consistently provide an environment
          which protects their employees health and safety and basic human
          rights. All Partners and other suppliers are expected to comply with
          their national employment laws and regulations with particular regard
          to: minimum age of employment, freely chosen employment, health and
          safety, freedom of association and the right to collective bargaining,
          no discrimination, no harsh or inhumane treatment, working hours, rates
          of pay and terms of employment.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Assessing Our Risks
        </h2>
        <p className="mb-4">
          In 2020, as part of our ongoing monitoring and management of ESG
          matters, the Company conducted a risk assessment across FARFETCH to
          evaluate Company practices and identify any new risks or material
          changes in relation to identified risks, including those associated
          with ESG and modern slavery. This assessment included a dedicated risk
          workshop facilitated by the FARFETCH risk team, following which the
          results were presented to the Board and the Board allocated executive
          ownership of the key risks for further ongoing monitoring. As reported
          in 2019, The Global Risk Committee (GRC), a management level committee
          working alongside the Risk Team, continues to act as an additional
          layer of assurance by verifying and monitoring risks on a quarterly
          basis prior to Audit Committee and Board review.
        </p>
        <p className="font-semibold">
          The FARFETCH Modern Slavery Statement 2020 was prepared by the General
          Counsel and the Director of Sustainability and approved on behalf of
          the Board of Directors of FARFETCH UK Limited on 05 October 2021.
        </p>
      </>
    ),
  },
  {
    title: "FARFETCH MODERN SLAVERY STATEMENT 2019",
    content: (
      <>
        <p className="mb-4">
          This statement is made by FARFETCH UK Limited (“FARFETCH”) pursuant to
          section 54 of the Modern Slavery Act 2015 and comprises the Company’s
          slavery and human trafficking statement for the financial year ending
          31 December 2019.
        </p>
        <p className="mb-4">
          At FARFETCH, our values are at the heart of everything we do and we use
          them as a guide to make decisions about what feels right for our
          business, our people, our customers and the partners we work with. One
          of our core values is ‘Be Human’, which means we look after other
          people, we embrace diversity and we help others to be successful. Our
          approach to the issue of Modern Slavery speaks to this value.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          FARFETCH Marketplace
        </h2>
        <p className="mb-4">
          FARFETCH is the leading global platform for the luxury fashion
          industry. Our mission is to be the global platform for luxury fashion,
          connecting creators, curators and consumers.
        </p>
        <p className="mb-4">
          The FARFETCH Marketplace is the first and largest application built on
          our platform. As of end of Q2 2020, the FARFETCH Marketplace connected
          consumers in 190 countries to nearly 1,300 luxury sellers. Our
          Marketplace model and the aggregation of luxury sellers requires us to
          build and nurture relationships with hundreds of brands and boutiques
          from across the world.
        </p>
        <p className="mb-4">
          We regularly evaluate the impact of our business through our
          partnerships with brands and boutiques and take a collaborative
          approach to identifying risks and areas where we can work with our
          partners to build appropriate and effective solutions to combat modern
          slavery and protect workers’ rights. Furthermore, we recognise that as
          a marketplace and platform we are uniquely placed to lead, encourage
          and support ethical purchasing practices in our partner brands and
          boutiques.
        </p>
        <p className="mb-4">
          In 2019, we launched a partnership with ethical rating agency Good On
          You to rate our key brand partners sold through our marketplace. The
          Good On You system assesses a brand’s policies and practices in three
          key areas; People, Planet and Animal. The ratings are based on publicly
          available information including industry standards, certifications and
          a brand’s own reporting. We prioritise the rating of all our brand
          partners - and reassess the performance of brands included in our
          conscious collection every 18 months. We are committed to focussing on
          this area over the coming years.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Business Operations and ‘Non-Stock’ Procurement
        </h2>
        <p className="mb-4">
          We have various suppliers who support the running of our various
          business units including (but not limited to) logistics, office
          management, marketing, and technology. We are currently in the process
          of implementing a software tool that will standardise the procurement
          and supplier assessment of their sustainability practices. This tool
          has the functionality to allow us to categorise direct suppliers and
          identify potential areas of focus / risk within our supply base. This
          will enable us to develop an approach to risk assessment for existing
          suppliers as well as begin to establish processes that we can undertake
          at the outset of any new sourcing activity.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Company Policies and Codes
        </h2>
        <p className="mb-4">
          Our Global Code of Conduct (“Code”) is embedded with certain policies
          relating to human rights. This is communicated to all employees by
          FARFETCH (translated as necessary) and forms part of the employee
          contract process. We have established a “Speak Up Line”, a
          whistleblowing process accessible to employees and external
          stakeholders (including vendors and suppliers) to ensure a clear and,
          where possible, confidential route for reporting any violations of the
          Code.
        </p>
        <p className="mb-4">
          We have rolled out our Vendor Code of Conduct (“Vendor Code”). Based on
          internationally recognised standards and principles, our Vendor Code
          sets forth the behaviours, standards and practices we expect from our
          vendors, their employees and subcontractors.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Assessing Our Risks
        </h2>
        <p className="mb-4">
          In our 2018 Modern Slavery Statement, FARFETCH committed to bring
          modern slavery and compliance with the Modern Slavery Act within the
          scope of the Risk Oversight Group (ROG), which classified and monitored
          risk across the FARFETCH Group and allocated mitigation activities to
          the relevant teams. However, in 2019 the FARFETCH Risk Team assessed
          the role of the ROG and concluded a new approach was needed. Work to
          establish a new working committee (the Global Risk Committee) was
          started in 2019 and will continue into 2020, working alongside the Risk
          Team and acting as an additional layer of assurance by verifying and
          monitoring risks on a quarterly basis prior to Executive Board and
          Audit Committee review. The Audit Committee is made up of Board
          members, with our CEO, CFO, General Counsel and Group Reporting
          Accountants in attendance. We will continue to monitor this process,
          escalate any material risks and make adjustments where necessary to
          ensure the effectiveness of our approach to the risk of modern slavery
          within the Group.
        </p>
        <p className="font-semibold">
          The FARFETCH Modern Slavery Statement 2019 was prepared by the General
          Counsel and the Director of Sustainability and approved on behalf of
          the Board of Directors of Farfetch UK Limited on 28 June 2021.
        </p>
      </>
    ),
  },
  {
    title: "FARFETCH MODERN SLAVERY STATEMENT 2018",
    content: (
      <>
        <p className="mb-4">
          This statement is made by Farfetch UK Limited (“Farfetch”) pursuant to
          section 54 of the Modern Slavery Act 2015 and comprises the Company’s
          slavery and human trafficking statement for the financial year ending
          31 December 2018.
        </p>
        <p className="mb-4">
          At Farfetch, our values are at the heart of everything we do and we use
          them as a guide to make decisions about what feels right for our
          business, our people, our customers and the partners we work with. One
          of our core values is ‘Be Human’, which means we look after other
          people, we embrace diversity and we help others to be successful. Our
          approach to the issue of Modern Slavery speaks to this value.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Farfetch Marketplace
        </h2>
        <p className="mb-4">
          Farfetch is a technology platform for the global luxury fashion
          industry. We operate a global luxury digital marketplace connecting
          brands, retailers and consumers. We are a technology company at our
          core and have created a purpose-built platform for the luxury fashion
          industry.
        </p>
        <p className="mb-4">
          The Farfetch Marketplace is the first and largest application built on
          our platform. As of 1 March 2019, the Farfetch Marketplace connected
          over 2.8 million Marketplace consumers in 190 countries to over 1,000
          luxury sellers. Our Marketplace model and the aggregation of luxury
          sellers requires us to build and nurture relationships with hundreds of
          brands and boutiques from across the world.
        </p>
        <p className="mb-4">
          We intend to regularly evaluate the impact of our business through our
          partnerships with brands and boutiques and take a collaborative
          approach to identifying risks and areas where we can work with our
          partners to build appropriate and effective solutions to combat modern
          slavery and protect workers’ rights. Furthermore, we recognise that as
          a marketplace and aggregator of fashion we are uniquely placed to lead,
          encourage and support ethical purchasing practices in our partner
          brands and boutiques and this is an area of focus that we have
          identified going forward over the coming years.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Business Operations and ‘Non-Stock’ Procurement
        </h2>
        <p className="mb-4">
          We have various suppliers (both direct and indirect) which support the
          running of our various business units including (but not limited to)
          logistics, cleaning, office management, technology and catering. We are
          currently in the process of developing a software tool that will
          standardise the procurement and supplier process. This tool will have
          the functionality to allow us to categorise direct suppliers and
          identify potential areas of focus / risk within our supply base. This
          will enable us to develop an approach to risk assessment for existing
          suppliers as well as begin to establish processes that we can undertake
          at the outset of any new sourcing activity.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Company Policies and Codes
        </h2>
        <p className="mb-3 text-base">
          Our Employee Code of Conduct (“Employee Code”) has been updated in
          order to embed certain policies relating to human rights. This will be
          communicated to all employees, consultants and freelancers that have
          been engaged by Farfetch (translated as necessary) and will form part
          of the employee contract process. As part of the roll-out of the new
          Code we have established a “Speak Up Line”, a whistleblowing process
          accessible to employees and certain external stakeholders (including
          vendors and suppliers) to ensure a clear and, where possible,
          confidential route for reporting any violations of the Code.
        </p>
        <p className="mb-3 text-base">
          We are currently in the process of rolling out our Supplier Code of
          Conduct (“Supplier Code”). Based on internationally recognised
          standards and principles, our Supplier Code will set forth the
          behaviours, standards and practices we expect from our suppliers, their
          employees and sub-contractors.
        </p>
        <h2 className="text-sm font-semibold text-preto mb-4">
          Assessing Our Risks
        </h2>
        <p className="mb-3 text-base">
          Our Risk Oversight Group (“ROG”) classifies and monitors risk across
          Farfetch Group and allocates mitigation activities to the relevant
          teams. This process is undertaken with the participation of the
          executives who make up the ROG. Each member of the ROG leads a number
          of teams from across the business, including legal, finance, people,
          operations, technology and supply chain, each of which feed into this
          process. The ROG meets quarterly to report on our progress against our
          objectives for the year and reports into the Group Audit Committee,
          made up of Board members, with our CEO, CFO, General Counsel and Group
          Reporting Accountants in attendance. In 2019, modern slavery and our
          compliance with the Modern Slavery Act 2015 will be brought within the
          scope of the ROG. This will ensure transparency across the Group as
          well as the full commitment of the executive in meeting our objectives
          for the year. We will continue to monitor this process and make
          adjustments where necessary to ensure the efficiency and effectiveness
          of our approach to the risk of modern slavery within the Group.
        </p>
        <p className="font-semibold">
          The Farfetch Modern Slavery Statement 2018 was prepared by the General
          Counsel and the Director of Sustainability and approved on behalf of
          the Board of Directors of Farfetch UK Limited on 1 April 2019.
        </p>
      </>
    ),
  },
];

const navigationLinks: SupportNavLink[] = [
  { href: "#", label: " HOLIDAY DATES YOU WANT TO KNOW ABOUT" },
  { href: "/contact-us", label: "Contact us" },
  { href: "#", label: "How to shop" },
  { href: "/orders-and-delivery", label: "Orders and delivery" },
  { href: "/payment-and-pricing", label: "Payment and pricing" },
  { href: "/cryptocurrency-payments", label: "Cryptocurrency Payments" },
  { href: "/returns-and-refunds", label: "Returns and refunds" },
  { href: "/faq", label: "FAQs" },
  { href: "#", label: "Terms and conditions" },
  { href: "#", label: "Privacy policy" },
  { href: "/modern-slavery-statement", label: "Modern slavery statement" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "#", label: "Cookie preferences" },
  {
    href: "/promotions-terms-and-conditions",
    label: "Promotions terms & conditions",
  },
];

const modernSlaveryPageStyles = {
  ...supportPageStyles,
  fontFamily: "\"Farfetch Basis\", \"Helvetica Neue\", Arial, sans-serif",
};

const ModernSlavery = () => {
  const pathname = usePathname();
  const [openSectionIndex, setOpenSectionIndex] = useState<number | null>(null);
  const [feedbackHelpful, setFeedbackHelpful] = useState<boolean | null>(null);

  const toggleSection = useCallback((index: number) => {
    setOpenSectionIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleFeedbackChange = useCallback((value: boolean) => {
    setFeedbackHelpful(value);
  }, []);

  const renderedSections = useMemo(
    () =>
      sections.map((section, sectionIndex) => (
        <AccordionSection
          key={section.title}
          section={section}
          index={sectionIndex}
          isOpen={openSectionIndex === sectionIndex}
          onToggle={toggleSection}
          containerClassName="border-b border-gray-200"
          buttonClassName="w-full py-4 flex items-center justify-between text-left  transition-colors "
          contentClassName="pb-4 px-4"
          titleClassName="font-light text-sm text-preto uppercase tracking-wide"
        />
      )),
    [openSectionIndex, toggleSection],
  );

  return (
    <div
      className="min-h-screen text-preto"
      style={modernSlaveryPageStyles}
    >
      <div className="max-w-[137rem] mx-auto px-[1.5rem] py-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:pl-16">
          {/* Left Navigation Menu */}
          <aside className="lg:w-78 flex-shrink-0">
            <SupportNavigation links={navigationLinks} activePath={pathname} />
          </aside>

          {/* Right Main Content */}
          <main className="flex-1 max-w-4xl lg:ml-12">
            {/* Title */}
            <h1 className="text-3xl md:text-2xl font-thin mb-8 text-preto">
              Modern Slavery Statement
            </h1>

            {/* Expandable Sections */}
            <div className="space-y-0 ">{renderedSections}</div>

            {/* Feedback Section */}
            <FeedbackPrompt
              helpfulValue={feedbackHelpful}
              onFeedbackChange={handleFeedbackChange}
              containerClassName="mt-13 pt-8"
              titleClassName="text-xs font-base text-preto mb-2"
              buttonClassName="px-6 py-2 text-sm font-semibold rounded-lg border border-preto transition-colors"
              activeButtonClassName="bg-preto text-white"
              inactiveButtonClassName="  text-preto hover:bg-gray-50 "
            />
          </main>
        </div>

        {/* Download App Banner Section - Full Width */}
        <div className="w-full lg:pl-8 mt-4">
          <div className="w-full lg:ml-4">
            <DownloadAppBanner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernSlavery;


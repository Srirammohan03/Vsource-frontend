import { Description, Image } from "@/types/LandingPage";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const COUNTRIES = ["USA", "UK", "Canada", "Ireland", "France"] as const;
export type Country = (typeof COUNTRIES)[number];

/**
 * {
 populate: {
    logo: {
      fields: ['url', 'documentId', 'name'],
    },
    banner: {
      fields: ['url', 'documentId', 'name'],
    },
    overview:true,
    stats:true,
    rankings:{
      populate:{
        items:true,
      },
    },
    intakes:{
      populate:{
        famous_intakes:true,
      },
    },
    courses:{
      populate:{
        famous_courses:true,
      },
    },
    cost_of_study:{
      populate:{
        expenses_table:true
      },
    },
    scholarship:{
      populate:{
        scholarship_details:true,
      },
    },
    admissions:{
      populate:{
        admissions_req:{
          populate:{
            requirement_items:true,
          },
        },
      },
    },
    placements:{
      populate:{
        jobs:true,
        top_recruiters_imgs:{
          fields: ['url', 'documentId', 'name'],
        },
      },
    },
    gallerys:{
      fields: ['url', 'documentId', 'name'],
    },
      faqs:{
      populate:{
        accordion:true,
      },
    },
  },  
}
 */

export interface University {
  id?: string;
  slug: string;
  name: string;
  logo: Image;
  banner: Image;
  country: string;
  campus: string;
  website: string;
  documentId?: string;
  overview: Description;

  stats: {
    id?: number;
    acceptanceRate: string;
    Total_International_Students: string;
    ratio: string;
    placement: string;
  };

  rankings: {
    id?: number;
    description: string;
    items: { id?: number; title: string; description: string }[];
  };

  intakes: {
    id?: number;
    description: string;
    famous_intakes: { id?: number; title: string; description: string }[];
  };

  courses: {
    id?: number;
    description: string;
    famous_courses: {
      id?: number;
      name: string;
      annual_fee: string;
      duration: string;
    }[];
  };

  cost_of_study: {
    id?: number;
    description: string;
    expenses_table?: {
      id?: number;
      types_of_expenses: string;
      annual_expenses: string;
    }[];
  };

  scholarship: {
    id?: number;
    description: string;
    scholarship_details: {
      id?: number;
      title: string;
      amount: string;
      type: string;
      level: string;
    }[];
  };

  admissions?: {
    id?: number;
    description: string;
    admissions_req: {
      id?: number;
      title: string;
      requirement_items: { id?: number; requirement_item: string }[];
    }[];
  };

  placements: {
    id?: number;
    description: string;
    jobs: { id?: number; job_profiles: string; average_salary: string }[];
    top_recruiters_imgs: Image[];
  };

  gallerys: Image[];

  faqs: {
    id?: number;
    accordion: { id?: number; question: string; answer: string }[];
  };
}

export interface Tab {
  id?: string;
  key: string;
  label: string;
}

export const fetchExploreUniversities = async (page = 1, country = "All") => {
  let baseUrl = `https://backend.vsourceoverseas.com/api/uni-directories?populate[logo][fields][0]=url&populate[logo][fields][1]=documentId&populate[logo][fields][2]=name&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=name&pagination[page]=${page}&pagination[pageSize]=12`;

  if (country !== "All") {
    baseUrl += `&filters[country][$in][0]=${country}`;
  }
  const { data } = await axios.get(baseUrl);
  const pagination = data?.meta?.pagination || {
    page: 1,
    pageSize: 12,
    pageCount: 1,
    total: 0,
  };

  return {
    universities: data.data || [],
    pagination,
  };
};

export const fetchUniversitiesByDocumentId = async (documentId: string) => {
  const { data } = await axios.get(
    `https://backend.vsourceoverseas.com/api/uni-directories/${documentId}?populate[logo][fields][0]=url&populate[logo][fields][1]=documentId&populate[logo][fields][2]=name&populate[banner][fields][0]=url&populate[banner][fields][1]=documentId&populate[banner][fields][2]=name&populate[overview]=true&populate[stats]=true&populate[rankings][populate][items]=true&populate[intakes][populate][famous_intakes]=true&populate[courses][populate][famous_courses]=true&populate[cost_of_study][populate][expenses_table]=true&populate[scholarship][populate][scholarship_details]=true&populate[admissions][populate][admissions_req][populate][requirement_items]=true&populate[placements][populate][jobs]=true&populate[placements][populate][top_recruiters_imgs][fields][0]=url&populate[placements][populate][top_recruiters_imgs][fields][1]=documentId&populate[placements][populate][top_recruiters_imgs][fields][2]=name&populate[gallerys][fields][0]=url&populate[gallerys][fields][1]=documentId&populate[gallerys][fields][2]=name&populate[faqs][populate][accordion]=true`
  );
  return data.data;
};

export const TABS: Tab[] = [
  { key: "overview", label: "Overview" },
  { key: "rankings", label: "Rankings" },
  { key: "intakes", label: "Intakes" },
  { key: "courses", label: "Top Courses" },
  { key: "cost", label: "Cost to Study" },
  { key: "scholarships", label: "Scholarships" },
  { key: "admissions", label: "Admissions" },
  { key: "placements", label: "Placements" },
  { key: "gallery", label: "Gallery" },
  { key: "faq", label: "FAQs" },
];

type ExploreUniversitiesResponse = {
  universities: University[];
  pagination: {
    page: number;
    total: number;
    pageCount: number;
    pageSize: number;
  };
};

export function useUniversities(page: number, country: string) {
  return useQuery<ExploreUniversitiesResponse>({
    queryKey: ["exploreUni", page, country],
    queryFn: () => fetchExploreUniversities(page, country),
    staleTime: 10 * 60 * 1000,
    placeholderData: {
      universities: [],
      pagination: { page: 1, pageSize: 12, pageCount: 1, total: 0 },
    },
  });
}

export function useUniversitiesByDocumentId(documentId: string) {
  return useQuery<University>({
    queryKey: ["exploreUniByDocumentId", documentId],
    queryFn: () => fetchUniversitiesByDocumentId(documentId),
    staleTime: 10 * 60 * 1000,
    enabled: !!documentId,
    placeholderData: keepPreviousData,
  });
}

// export const UNIVERSITIES: University[] = [
//   {
//     key: "coventry-university",
//     name: "Coventry University",
//     logo: "/assets/images/university-banners/uk-banner/Coventry_University/Coventry-University-logo.webp",
//     banner:
//       "/assets/images/university-banners/uk-banner/Coventry_University/Coventry_University.webp",
//     country: "UK",
//     campus: "Coventry Campus, London Campus",
//     website: "https://www.coventry.ac.uk",

//     overview: [
//       "Known as the ‘UK City of Culture,’ Coventry is home to one of the fastest-growing universities in United Kingdom. Established in 1843, Coventry University has a rich history of excellence in teaching and research. Its main campus is located in Coventry, with additional campuses in London, Scarborough, and even internationally in Wroclaw, Poland and Kazakhstan.",

//       "Coventry University welcomes over 13,000 international students, with an impressive 50% being female, showcasing its commitment to diversity and equality. Its motto, Arte et Industria (By Art and Industry), highlights a forward-thinking blend of creativity and practical expertise. With over 11 research centers, the university is actively contributing to advancements in various fields.",

//       "Ranked among the top universities in UK, Coventry University is affiliated with prestigious organizations like the Association of Commonwealth Universities, Universities UK, and the European University Association. Plus, Coventry University acceptance rate exceeds 70% making it an accessible option for many aspiring learners worldwide.",
//     ],

//     stats: {
//       acceptanceRate: "79%",
//       intlStudents: "4244+",
//       ratio: "18:1",
//       placement: "94%",
//     },

//     rankings: {
//       description: [
//         "With over 2,000 expert teaching staff and state-of-the-art facilities, Coventry University is committed to putting students first.This dedication has earned it a strong reputation and rising rankings worldwide.Notably, Coventry University has achieved its highest - ever placement by moving up in global rankings.",
//         "The university’s commitment to teaching quality is further highlighted by its awards in various ranking frameworks, recognizing exceptional student experiences and outcomes. This growth is due to continual investment in facilities and a supportive environment designed to help students reach their potential.",
//       ],
//       items: [
//         { rank: "#651–700", source: "QS World University Rankings" },
//         { rank: "#601–800", source: "Times Higher Education" },
//         { rank: "#50", source: "Guardian University Guide (UK)" },
//       ],
//     },

//     intakes: [
//       {
//         text: [
//           "Coventry University offers unmatched flexibility with its multiple intake periods, making it convenient for students to start their courses. Coventry University intake has over seven intakes throughout the year. However, the three primary intakes are the most popular, as they host the majority of master’s and bachelor’s programs.",
//           "For other intake periods, the university provides options like short-term courses, diplomas, and other specific programs. As Coventry University intakes for some programs are exclusively available during that specific time, it is essential to verify the intake period for the preferred course in advance.",
//         ],
//       },
//       {
//         month: "September",
//         dropText:
//           "Over 85 postgraduate and few undergraduate programs are available in this winter intake.",
//       },
//       {
//         month: "January",
//         dropText:
//           "A selection of postgraduate and undergraduate courses is offered during this spring intake.",
//       },
//       {
//         month: "May",
//         dropText:
//           "This fall intake is the major one in which all of the undergraduate and postgraduate courses are offered.",
//       },
//     ],

//     courses: {
//       description: [
//         "Coventry University is well-known for offering many courses at undergraduate and postgraduate levels to students from all over the world. Among these, the Coventry University postgraduate courses are very popular. There are more than 230+ undergraduate and post-graduate courses that help students gain advanced knowledge in areas like Business & Management, Engineering & Technology, Health & Life Sciences, and Arts & Humanities.",
//         "The university teaches students through four main schools: the College of Arts and Society, the College of Engineering, Environment, and Science, the School of Health and Care, and the College of Business and Law. Coventry is also one of the largest universities in Europe for business-related courses.",
//         "Some postgraduate courses, such as MSc programs, also offer the chance to do Extended Professional Practice. This gives students real-world experience while they study. Besides this, Coventry University courses also include short programs in over 20 languages. The university is ranked 1st for Skills Development in the Postgraduate Taught Experience Survey (PTES) 2024, showing its strong focus on preparing students for success.",
//       ],
//       items: [
//         { study: "MBA Global Business", cost: "£20,350.00" },
//         { study: "MBA Master of Business Administration", cost: "£20,350.00" },
//         { study: "MSc Business Analytics", cost: "£20,050.00" },
//         { study: "MSc International Business Management", cost: "£20,050.00" },
//         { study: "MSc Computer Science", cost: "£20,050.00" },
//         { study: "MSc Data Science", cost: "£20,050.00" },
//         {
//           study: "MSc Data Science and Computational Intelligence",
//           cost: "£20,050.00",
//         },
//         {
//           study: "MSc Artificial Intelligence and Human Factors",
//           cost: "£18,600.00",
//         },
//         { study: "MSc Cyber Security", cost: "£20,050.00" },
//         { study: "MSc Advanced Mechanical Engineering", cost: "£20,050.00" },
//       ],
//     },

//     cost: [
//       {
//         text: [
//           "When it comes to Coventry University tuition fees for international students, affordability is a key factor to consider. Coventry City itself has been ranked as one of the top five student-friendly cities in the UK for affordability, as per the QS Best Student Cities Index 2024. This means students can expect reasonable living expenses while enjoying a vibrant student life.",
//           "In addition, Coventry University fees for both undergraduate and postgraduate programs are among the most competitive in the UK. Specifically, Coventry University fees for Indian students are designed to be manageable, with the university offering flexible payment installment plans for self-funded students.",
//         ],
//       },
//       {
//         tableData: [
//           { type: "Annual PG Tuition fee", cost: "20–22 Lakhs" },
//           { type: "Annual UG Tuition fee", cost: "18–22 Lakhs" },
//           { type: "Annual Accommodation & food expenses", cost: "12–15 Lakhs" },
//         ],
//       },
//     ],

//     Scholarships: {
//       description: [
//         "There are several Coventry University scholarships for international students. The university has also expanded its range of international scholarships and discounts for the January and May 2025 intakes. Unlike many other universities, there is no separate application process for Coventry University scholarships. Eligible students who meet the criteria will automatically receive the award after successfully completing the enrolment process as stated in their offer letter.",
//         "However, it is important to note that Coventry University scholarships for undergraduate students are not currently available.",
//       ],
//       items: [
//         {
//           name: "Vice-Chancellor's International Scholarship",
//           amount: "£3,000",
//           type: "Merit-based",
//           level: "Postgraduate",
//           eligibility:
//             "Available to high-achieving international students enrolling in postgraduate taught courses.",
//         },
//         {
//           name: "Excellence Scholarship",
//           amount: "£2,000",
//           type: "Merit-based",
//           level: "Postgraduate",
//           eligibility:
//             "Awarded to international students with outstanding academic records enrolling in postgraduate taught courses.",
//         },
//         {
//           name: " Ambassador Scholarship",
//           amount: "£1,500",
//           type: "Merit-based",
//           level: "Postgraduate",
//           eligibility:
//             "Given to international students who demonstrate leadership qualities and contribute to the university community.",
//         },
//         {
//           name: "Alumni Discount",
//           amount: "10% tuition fee reduction",
//           type: "Alumni-based",
//           level: "Postgraduate",
//           eligibility:
//             "Available to former Coventry University students enrolling in postgraduate taught courses.",
//         },
//       ],
//     },

//     Admissions: {
//       description: [
//         " Understanding the Coventry University admissions criteria is essential before starting the application. One needs to gather all the necessary documents to meet the requirements. Once done with this, students can easily receive a Coventry University admissions letter for their chosen master’s or bachelor’s program. After fulfilling all the conditions stated in the offer letter, the university will issue a Confirmation of Acceptance for Studies (CAS), which is a crucial document for the visa application. Coventry University aims to provide an initial decision on applications within one week.",
//         " Before applying for a student visa, students need to apply for Coventry University admission letter. This will give them enough time to manage the visa process and settle in the UK before the course begins.",
//       ],
//       items: [
//         {
//           academicRequirements: [
//             "A minimum of 60% in a three-year undergraduate degree.",
//             " A minimum of 55% in a four-year undergraduate degree (requirements may vary by program).",
//           ],
//           englishRequirements: [
//             "IELTS:  Overall 6.5, with no band lower than 5.5.",
//             "TOEFL iBT: Overall 88, with a minimum component score of 19.",
//             "PTE Academic:Overall 71, with a minimum component score of 59.",
//           ],
//         },
//       ],
//     },

//     faq: [
//       {
//         question: " What is the application process?",
//         answer:
//           "There is no application fee, and students can apply directly through the university's website. For undergraduate courses, applications can also be submitted via UCAS. Once an application is received, the Admissions team typically processes it within five working days. If any required documents are missing, the university will contact the applicant for further submission.",
//       },
//       {
//         question: "Can students apply for multiple courses?",
//         answer:
//           "Yes, it is possible to apply for more than one course at Coventry University. However, a separate personal statement may be required for each application. While multiple offers can be received, students can only enroll in one program at a time, so making a final decision before the acceptance deadline is essential.",
//       },
//       {
//         question: "What accommodation options are available?",
//         answer:
//           "Students at Coventry University have access to a range of accommodation options, both on-campus and off-campus. The university provides housing to suit different preferences and budgets, from student halls close to the campus to private housing around the city.",
//       },
//     ],

//     placements: {
//       description: [
//         "Based on recent data, the Coventry University placement rate is reported to be 95%, highlighting the university's strong focus on employability. Recognized for its efforts, Coventry University has received the prestigious Queen’s Award for Enterprise, celebrating its dedication to building global relationships with institutions and companies.",
//         "The Coventry University placement team actively supports students in securing internships and co-op opportunities during their studies, ensuring hands-on experience and industry exposure that enhance career prospects.",
//       ],
//       jobs: [
//         {
//           JobProfiles: "Financial Planning Analyst",
//           AverageSalary: "30K - 44K",
//         },
//         { JobProfiles: "HR Manager", AverageSalary: "38K - 57K" },
//         { JobProfiles: "Software Programmer", AverageSalary: "38K - 60K" },
//         { JobProfiles: "Performance analyst", AverageSalary: "29K - 43K" },
//         {
//           JobProfiles: "Human Rights Investigator",
//           AverageSalary: "27K - 46K",
//         },
//         { JobProfiles: "BIM Manager", AverageSalary: "42K - 60K" },
//         { JobProfiles: "Civil Engineer", AverageSalary: "30K - 42K" },
//         { JobProfiles: "Electrical Engineer", AverageSalary: "30K - 43K" },
//       ],

//       TopRecruitersImg: [
//         "/assets/images/university-banners/uk-banner/Coventry_University/Heat-rec.webp",
//         "/assets/images/university-banners/uk-banner/Coventry_University/Smith-rec.webp",
//         "/assets/images/university-banners/uk-banner/Coventry_University/NG_Bank.webp",
//         "/assets/images/university-banners/uk-banner/Coventry_University/ford.webp",
//         "/assets/images/university-banners/uk-banner/Coventry_University/Herbert.webp",
//         "/assets/images/university-banners/uk-banner/Coventry_University/Claire.webp",
//       ],
//     },

//     gallery: [
//       "/assets/images/university-banners/uk-banner/Coventry_University/4.webp",
//       "/assets/images/university-banners/uk-banner/Coventry_University/3.webp",
//       "/assets/images/university-banners/uk-banner/Coventry_University/2.webp",
//       "/assets/images/university-banners/uk-banner/Coventry_University/1.webp",
//       "/assets/images/university-banners/uk-banner/Coventry_University/5.webp",
//     ],
//   },

//   {
//     key: "University of Hertfordshire",
//     name: "University of Hertfordshire",
//     logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Hertfordshire.webp",
//     banner:
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/banner-hertfordshire.webp",
//     country: "UK",
//     campus: "Hatfield Campus",
//     website: "coventryacuk.co",

//     overview: [
//       "The University of Hertfordshire stands as a key academic institution in its region, widely recognized for fostering innovation and modern education. Originally established in 1952 as a Technical College, it has grown into a forward-thinking and inclusive university with a strong global reputation. Today, it is home to more than 35,000 students, of which around 18,000 come from over 110 countries worldwide.",

//       "Conveniently located in Hatfield, just a 25-minute train journey from London King’s Cross, the University combines the advantages of a peaceful campus setting with close access to one of the world’s most dynamic cities. Its commitment to quality has been acknowledged through prestigious honors, including being the only university to receive the King’s Award for Enterprise, along with achieving a Silver rating in the UK’s Teaching Excellence Framework (TEF). Offering more than 300 academic programs across diverse fields, it provides students with a wide spectrum of opportunities.",

//       "A strong focus on career readiness further strengthens the University’s appeal. More than 96% of its graduates secure employment or pursue higher studies within six months of completing their degree, highlighting its dedication to producing industry-ready professionals. With its excellent academic standards, supportive environment, and strong employability record, the University of Hertfordshire is regarded among the leading higher education providers in the UK.",
//     ],

//     stats: {
//       acceptanceRate: "80%",
//       intlStudents: "13,000+",
//       ratio: "1:18",
//       placement: "96%",
//     },

//     rankings: {
//       description: [
//         "The University of Hertfordshire has shown steady progress in national league tables, reflecting its dedication to academic quality and student experience. According to the most recent National Student Survey, it was recognized as the leading institution in the East of England for overall student positivity, marking the second year in a row it has achieved this distinction.",

//         "On the global stage, the QS World University Rankings place Hertfordshire among the top public universities in Hatfield, UK. Key strengths contributing to this recognition include its high proportion of international students and its strong global research collaborations. Combined with its reputation for delivering impactful research, these achievements reinforce the University’s commitment to offering an exceptional and internationally respected education.",
//       ],
//       items: [
//         { rank: "#851–900", source: "QS World Rankings" },
//         { rank: "#601–800", source: "Times Higher Education" },
//         { rank: "#84", source: "Complete University Guide" },
//       ],
//     },

//     intakes: [
//       {
//         text: [
//           "The University of Hertfordshire provides two admission intakes each year, in September and January. Similar to other top universities in the UK, this flexible system allows students to choose a start date that best aligns with their academic plans. It is important to note that application deadlines and the availability of specific courses may differ depending on the chosen intake.",
//         ],
//       },
//       {
//         month: "September",
//         dropText:
//           "The September intake is the main entry point, with a comprehensive range of Undergraduate and Postgraduate programs available.",
//       },
//       {
//         month: "January",
//         dropText:
//           "The January intake provides an alternative entry point for students who wish to begin their studies later in the academic year. A selection of programs is available for this intake, and applicants are advised to review individual course pages to confirm which options are open, along with the relevant application deadlines.",
//       },
//     ],

//     courses: {
//       description: [
//         "The University of Hertfordshire presents an extensive selection of academic programs at both undergraduate and postgraduate levels. With more than 300 degrees offered across seven Schools of Study, international students can choose from a wide variety of subjects that align with their personal goals and career ambitions.",

//         "Each program is designed with a strong industry focus, ensuring students gain not only theoretical knowledge but also valuable hands-on experience through opportunities such as work placements. Undergraduate options span diverse fields ranging from business and accounting to creative arts and sports therapy. For those pursuing advanced study, the University’s postgraduate courses provide in-depth learning, strengthen expertise, and support professional development.",
//       ],
//       items: [
//         {
//           study: "MSc Artificial Intelligence and Robotics",
//           cost: "£16,450.00",
//         },
//         { study: "MSc Management", cost: "£16,450.00" },
//         {
//           study: "MSc Supply Chain and Logistics Management",
//           cost: "£17,250.00",
//         },
//         { study: "MSc Computer Science", cost: "£17,250.00" },
//         { study: "MSc in Mechanical Engineering", cost: "£17,250.00" },
//         { study: "MBA", cost: "£18,800.00" },
//         {
//           study: "MSc Automotive Engineering",
//           cost: "£17,020.00",
//         },
//         {
//           study: "LLM Criminal Justice",
//           cost: "£17,250.00",
//         },
//         { study: "MSc Business Psychology", cost: "£17,250.00" },
//       ],
//     },

//     cost: [
//       {
//         text: [
//           "The University of Hertfordshire strives to make high-quality education accessible to students from around the world. Tuition fees are standardized annually and apply equally to both classroom-based and laboratory-based programs, though a few courses may carry different fee structures.",

//           "International students who choose to pay their tuition fees in full at or before registration are eligible for a £1,000 discount. Beyond tuition, applicants should also plan for living expenses to get a realistic view of the overall cost of studying in the UK. A detailed breakdown of confirmed tuition fees and additional costs is provided in the official offer letter upon admission.",
//         ],
//       },
//       {
//         tableData: [
//           { type: "Annual PG Tuition fee", cost: "18–20 Lakhs" },
//           { type: "Annual UG Tuition fee", cost: "16–17 Lakhs" },
//           { type: "Annual Accommodation & food expenses", cost: "12–15 Lakhs" },
//         ],
//       },
//     ],

//     Scholarships: {
//       description: [
//         "The University of Hertfordshire offers a range of scholarships designed to reward academic achievement and ease the financial commitment of studying abroad. These include merit-based awards, sports scholarships, and subject-specific funding opportunities, with most providing tuition fee reductions for eligible international students.",

//         "In many cases, applicants do not need to submit a separate application, as consideration is automatic once an offer of admission is made. Additionally, the University provides several dedicated scholarships for Indian students. The specific eligibility requirements, application steps, and deadlines vary depending on the scholarship.",
//       ],
//       items: [
//         {
//           name: "Early Bird Discount",
//           amount: "£2,000",
//           type: "Merit-based",
//           level: "Bachelors/Masters",
//         },
//         {
//           name: "Chancellor's International Scholarship",
//           amount: " £500 up to £4,000 ",
//           type: "Merit-based",
//           level: "Bachelors/Masters",
//         },
//       ],
//     },

//     Admissions: {
//       description: [
//         "Admission requirements at the University of Hertfordshire differ based on the program and level of study. Similarly, application deadlines vary depending on the chosen intake and course.",

//         "For Indian applicants, the University outlines specific entry requirements that can be reviewed in detail on the official website or relevant course pages.",
//       ],
//       items: [
//         {
//           academicRequirements: [
//             "Indian students need a minimum of 55% to 65% and above in relevant subjects depending on the course selection.",
//           ],
//           englishRequirements: [
//             "IELTS: The University of Hertfordshire IELTS requirement includes an overall IELTS score of 6/6.5 with no band less than 5.5 ",
//             " PTE : Overall score of 59 with no individual score less than 59",
//             "TOEFL : Overall score of 79 with minimum scores of 18 in Reading, 17 in Writing, 17 in Listening, and 20 in Speaking",
//             "*Note: The university may grant an English Language Waiver based on a student's 12th-grade English scores as per the education board.",
//           ],
//         },
//       ],
//     },

//     placements: {
//       description: [
//         "The University of Hertfordshire places a strong emphasis on graduate employability by offering extensive placement opportunities, dedicated career services, and connections with more than 5,500 employers. This commitment is reflected in its impressive outcomes, with 96% of graduates securing employment or progressing to further study within 15 months of completing their degree. These results highlight the University’s success in equipping students with the skills and experience needed for thriving careers.",

//         "Its close proximity to London, combined with a well-connected Hatfield campus, further enhances access to diverse professional opportunities in one of the world’s leading job markets.",
//       ],
//       jobs: [
//         { JobProfiles: "Data Scientist", AverageSalary: "30K - 50K" },
//         { JobProfiles: "Finance Analyst", AverageSalary: "40K - 50K" },
//         { JobProfiles: "Operations Manager", AverageSalary: "30K - 50K" },
//         { JobProfiles: "IT Consultant", AverageSalary: "40K - 55K" },
//         {
//           JobProfiles: "Business Analytic Manager",
//           AverageSalary: "40K - 60K",
//         },
//         {
//           JobProfiles: "Business Intelligence Analyst",
//           AverageSalary: "40K - 70K",
//         },
//         { JobProfiles: "Midwife", AverageSalary: "35K - 50K" },
//         { JobProfiles: "Media Analyst", AverageSalary: "37K - 56K" },
//         { JobProfiles: "Social Media Executive", AverageSalary: "25K - 35K" },
//       ],
//       TopRecruitersImg: [
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Airbus.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Mc_Laren.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/JP_Morgan_Chase.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/ford.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/google.svg",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Canon.webp",
//       ],
//     },

//     gallery: [
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/1.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/3.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/4.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/2.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/5.webp",
//     ],

//     faq: [
//       {
//         question:
//           "How to apply at the University of Hertfordshire as an Indian student?",
//         answer:
//           "International students can apply to the University of Hertfordshire either by submitting the dedicated international application form or through authorized in-country representatives. For undergraduate programs, applications are processed via UCAS. Once an application is submitted, the outcome is communicated to applicants through email.",
//       },
//       {
//         question:
//           "How long does it take to get a response on the University of Hertfordshire application?",
//         answer:
//           "The admissions team generally responds quickly after an application is approved, though processing times may vary depending on the chosen course.",
//       },
//       {
//         question:
//           "Does the University of Hertfordshire consider deferring the offer to a future intake?",
//         answer:
//           "Applicants who wish to change their course after receiving an offer can do so by contacting the International Student Support team. To initiate the process, students must provide their ID number along with details of the preferred new course. The team will review the request and may ask for further information if needed.",
//       },
//       {
//         question:
//           " Is it mandatory to pay a deposit for studying at the University of Hertfordshire?",
//         answer:
//           "Students may also request to defer their course intake. This is done by completing a deferral request form to transfer the offer to the next available intake.",
//       },
//     ],
//   },

//   {
//     key: "Aston University",
//     name: "Aston University",
//     logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/AU_Birmingham_logo_Purple_RGB.png",
//     banner:
//       "/assets/images/university-banners/uk-banner/Aston-university/Aston_University-banner.webp",
//     country: "UK",
//     campus: "London Campus, Birmingham Campus",
//     website: "coventryacuk.co",

//     overview: [
//       "Aston University has a long-standing tradition of growth and innovation. Founded in 1895 as the Birmingham Municipal Technical School, it later became Birmingham Central Technical College in 1927, and then the College of Technology in 1951. On April 22, 1966, it was granted university status through a Royal Charter. Today, Aston is based on a 60-acre urban campus at Gosta Green in the heart of Birmingham, welcoming more than 18,000 students representing over 120 nationalities. It is widely recognized as one of the most diverse universities in the UK.",

//       "Looking to the future, Aston’s 2030 Strategy sets out its vision to become a leading institution in science, technology, and enterprise. The plan emphasizes high-quality teaching, impactful research, and advancing social mobility. Students can choose from a wide range of undergraduate and postgraduate programs across three main academic colleges: Business and Social Sciences, Health and Life Sciences, and Engineering and Physical Sciences. The University’s strong research culture further reinforces its reputation as a forward-thinking, technical institution.",

//       "Aston is also credited with introducing the integrated placement year more than fifty years ago. Today, over 73% of Aston students participate in a placement year, the highest proportion in the UK. This focus on employability has led to outstanding graduate outcomes, with Aston alumni earning an average salary of £35,400 five years after graduation — placing the University among the top UK institutions for graduate earnings",
//     ],

//     stats: {
//       acceptanceRate: "80%",
//       intlStudents: "3500+",
//       ratio: "19:5:1",
//       placement: "80%",
//     },

//     rankings: {
//       description: [
//         "Aston University has received notable recognition in respected national and international rankings, highlighting its strong focus on academic quality and student achievement. On the global stage, Aston is ranked within the top 10% of universities assessed worldwide.",

//         "In the UK, the University was recently named University of the Year for Student Success, a reflection of its excellent graduate outcomes, including competitive salaries and a high percentage of students graduating with first-class or upper second-class degrees. Aston’s long-standing commitment to widening participation is also evident, as it has consistently ranked among the top institutions in England for social mobility over the past four years.",
//       ],
//       items: [
//         { rank: "#395", source: "QS World Rankings" },
//         { rank: "#301–400", source: "Times Higher Education" },
//         { rank: "#44", source: "Complete University Guide" },
//       ],
//     },

//     intakes: [
//       {
//         text: [
//           "Aston University follows a structured yet flexible academic calendar, offering several entry points during the year to suit different programs and student preferences. The main intakes take place in September, January, and April, giving applicants the opportunity to choose a start date that best aligns with their academic and personal plans.",
//         ],
//       },
//       {
//         month: "September",
//         dropText:
//           "The September intake serves as the primary entry point at Aston University, with the widest selection of undergraduate and postgraduate programs available. This intake follows the traditional academic cycle, giving international students access to the full range of courses as well as numerous opportunities to take part in campus activities and student events.",
//       },
//       {
//         month: "January & April",
//         dropText:
//           "The January intake offers a secondary start date for a number of undergraduate and postgraduate taught programs. It is particularly useful for students who require extra time to complete entry requirements or who prefer to begin their studies in the new year.",
//       },
//     ],

//     courses: {
//       description: [
//         "The University of Hertfordshire presents an extensive selection of academic programs at both undergraduate and postgraduate levels. With more than 300 degrees offered across seven Schools of Study, international students can choose from a wide variety of subjects that align with their personal goals and career ambitions.",

//         "Each program is designed with a strong industry focus, ensuring students gain not only theoretical knowledge but also valuable hands-on experience through opportunities such as work placements. Undergraduate options span diverse fields ranging from business and accounting to creative arts and sports therapy. For those pursuing advanced study, the University’s postgraduate courses provide in-depth learning, strengthen expertise, and support professional development.",
//       ],
//       items: [
//         {
//           study: "MSc Artificial Intelligence and Robotics",
//           cost: "£16,450.00",
//         },
//         { study: "MSc Management", cost: "£16,450.00" },
//         {
//           study: "MSc Supply Chain and Logistics Management",
//           cost: "£17,250.00",
//         },
//         { study: "MSc Computer Science", cost: "£17,250.00" },
//         { study: "MSc in Mechanical Engineering", cost: "£17,250.00" },
//         { study: "MBA", cost: "£18,800.00" },
//         {
//           study: "MSc Automotive Engineering",
//           cost: "£17,020.00",
//         },
//         {
//           study: "LLM Criminal Justice",
//           cost: "£17,250.00",
//         },
//         { study: "MSc Business Psychology", cost: "£17,250.00" },
//       ],
//     },

//     cost: [
//       {
//         text: [
//           "The University of Hertfordshire strives to make high-quality education accessible to students from around the world. Tuition fees are standardized annually and apply equally to both classroom-based and laboratory-based programs, though a few courses may carry different fee structures.",

//           "International students who choose to pay their tuition fees in full at or before registration are eligible for a £1,000 discount. Beyond tuition, applicants should also plan for living expenses to get a realistic view of the overall cost of studying in the UK. A detailed breakdown of confirmed tuition fees and additional costs is provided in the official offer letter upon admission.",
//         ],
//       },
//       {
//         tableData: [
//           { type: "Annual PG Tuition fee", cost: "18–20 Lakhs" },
//           { type: "Annual UG Tuition fee", cost: "16–17 Lakhs" },
//           { type: "Annual Accommodation & food expenses", cost: "12–15 Lakhs" },
//         ],
//       },
//     ],

//     Scholarships: {
//       description: [
//         "The University of Hertfordshire offers a range of scholarships designed to reward academic achievement and ease the financial commitment of studying abroad. These include merit-based awards, sports scholarships, and subject-specific funding opportunities, with most providing tuition fee reductions for eligible international students.",

//         "In many cases, applicants do not need to submit a separate application, as consideration is automatic once an offer of admission is made. Additionally, the University provides several dedicated scholarships for Indian students. The specific eligibility requirements, application steps, and deadlines vary depending on the scholarship.",
//       ],
//       items: [
//         {
//           name: "Early Bird Discount",
//           amount: "£2,000",
//           type: "Merit-based",
//           level: "Bachelors/Masters",
//         },
//         {
//           name: "Chancellor's International Scholarship",
//           amount: " £500 up to £4,000 ",
//           type: "Merit-based",
//           level: "Bachelors/Masters",
//         },
//       ],
//     },

//     Admissions: {
//       description: [
//         "Admission requirements at the University of Hertfordshire differ based on the program and level of study. Similarly, application deadlines vary depending on the chosen intake and course.",

//         "For Indian applicants, the University outlines specific entry requirements that can be reviewed in detail on the official website or relevant course pages.",
//       ],
//       items: [
//         {
//           academicRequirements: [
//             "Indian students need a minimum of 55% to 65% and above in relevant subjects depending on the course selection.",
//           ],
//           englishRequirements: [
//             "IELTS: The University of Hertfordshire IELTS requirement includes an overall IELTS score of 6/6.5 with no band less than 5.5 ",
//             " PTE : Overall score of 59 with no individual score less than 59",
//             "TOEFL : Overall score of 79 with minimum scores of 18 in Reading, 17 in Writing, 17 in Listening, and 20 in Speaking",
//             "*Note: The university may grant an English Language Waiver based on a student's 12th-grade English scores as per the education board.",
//           ],
//         },
//       ],
//     },

//     placements: {
//       description: [
//         "The University of Hertfordshire places a strong emphasis on graduate employability by offering extensive placement opportunities, dedicated career services, and connections with more than 5,500 employers. This commitment is reflected in its impressive outcomes, with 96% of graduates securing employment or progressing to further study within 15 months of completing their degree. These results highlight the University’s success in equipping students with the skills and experience needed for thriving careers.",

//         "Its close proximity to London, combined with a well-connected Hatfield campus, further enhances access to diverse professional opportunities in one of the world’s leading job markets.",
//       ],
//       jobs: [
//         { JobProfiles: "Data Scientist", AverageSalary: "30K - 50K" },
//         { JobProfiles: "Finance Analyst", AverageSalary: "40K - 50K" },
//         { JobProfiles: "Operations Manager", AverageSalary: "30K - 50K" },
//         { JobProfiles: "IT Consultant", AverageSalary: "40K - 55K" },
//         {
//           JobProfiles: "Business Analytic Manager",
//           AverageSalary: "40K - 60K",
//         },
//         {
//           JobProfiles: "Business Intelligence Analyst",
//           AverageSalary: "40K - 70K",
//         },
//         { JobProfiles: "Midwife", AverageSalary: "35K - 50K" },
//         { JobProfiles: "Media Analyst", AverageSalary: "37K - 56K" },
//         { JobProfiles: "Social Media Executive", AverageSalary: "25K - 35K" },
//       ],
//       TopRecruitersImg: [
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Airbus.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Mc_Laren.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/JP_Morgan_Chase.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/ford.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/google.svg",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Canon.webp",
//       ],
//     },

//     gallery: [
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/1.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/3.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/4.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/2.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/5.webp",
//     ],

//     faq: [
//       {
//         question:
//           "How to apply at the University of Hertfordshire as an Indian student?",
//         answer:
//           "International students can apply to the University of Hertfordshire either by submitting the dedicated international application form or through authorized in-country representatives. For undergraduate programs, applications are processed via UCAS. Once an application is submitted, the outcome is communicated to applicants through email.",
//       },
//       {
//         question:
//           "How long does it take to get a response on the University of Hertfordshire application?",
//         answer:
//           "The admissions team generally responds quickly after an application is approved, though processing times may vary depending on the chosen course.",
//       },
//       {
//         question:
//           "Does the University of Hertfordshire consider deferring the offer to a future intake?",
//         answer:
//           "Applicants who wish to change their course after receiving an offer can do so by contacting the International Student Support team. To initiate the process, students must provide their ID number along with details of the preferred new course. The team will review the request and may ask for further information if needed.",
//       },
//       {
//         question:
//           " Is it mandatory to pay a deposit for studying at the University of Hertfordshire?",
//         answer:
//           "Students may also request to defer their course intake. This is done by completing a deferral request form to transfer the offer to the next available intake.",
//       },
//     ],
//   },

//   {
//     key: "University of North Texas",
//     name: "University of North Texas",
//     logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University of North Texas.svg",
//     banner:
//       "/assets/images/university-banners/usa-banner/North-texas/University_of_North_Texas-Banner.webp",
//     country: "USA",
//     campus:
//       "Long Beach, Fullerton, San Bernardino, Chico, East Bay, Sacaramento, Los Angeles",
//     website: "www.unt.edu",

//     overview: [
//       "Aston University has a long-standing tradition of growth and innovation. Founded in 1895 as the Birmingham Municipal Technical School, it later became Birmingham Central Technical College in 1927, and then the College of Technology in 1951. On April 22, 1966, it was granted university status through a Royal Charter. Today, Aston is based on a 60-acre urban campus at Gosta Green in the heart of Birmingham, welcoming more than 18,000 students representing over 120 nationalities. It is widely recognized as one of the most diverse universities in the UK.",

//       "Looking to the future, Aston’s 2030 Strategy sets out its vision to become a leading institution in science, technology, and enterprise. The plan emphasizes high-quality teaching, impactful research, and advancing social mobility. Students can choose from a wide range of undergraduate and postgraduate programs across three main academic colleges: Business and Social Sciences, Health and Life Sciences, and Engineering and Physical Sciences. The University’s strong research culture further reinforces its reputation as a forward-thinking, technical institution.",

//       "Aston is also credited with introducing the integrated placement year more than fifty years ago. Today, over 73% of Aston students participate in a placement year, the highest proportion in the UK. This focus on employability has led to outstanding graduate outcomes, with Aston alumni earning an average salary of £35,400 five years after graduation — placing the University among the top UK institutions for graduate earnings",
//     ],

//     stats: {
//       acceptanceRate: "80%",
//       intlStudents: "3500+",
//       ratio: "19:5:1",
//       placement: "80%",
//     },

//     rankings: {
//       description: [
//         "Aston University has received notable recognition in respected national and international rankings, highlighting its strong focus on academic quality and student achievement. On the global stage, Aston is ranked within the top 10% of universities assessed worldwide.",

//         "In the UK, the University was recently named University of the Year for Student Success, a reflection of its excellent graduate outcomes, including competitive salaries and a high percentage of students graduating with first-class or upper second-class degrees. Aston’s long-standing commitment to widening participation is also evident, as it has consistently ranked among the top institutions in England for social mobility over the past four years.",
//       ],
//       items: [
//         { rank: "#395", source: "QS World Rankings" },
//         { rank: "#301–400", source: "Times Higher Education" },
//         { rank: "#44", source: "Complete University Guide" },
//       ],
//     },

//     intakes: [
//       {
//         text: [
//           "Aston University follows a structured yet flexible academic calendar, offering several entry points during the year to suit different programs and student preferences. The main intakes take place in September, January, and April, giving applicants the opportunity to choose a start date that best aligns with their academic and personal plans.",
//         ],
//       },
//       {
//         month: "September",
//         dropText:
//           "The September intake serves as the primary entry point at Aston University, with the widest selection of undergraduate and postgraduate programs available. This intake follows the traditional academic cycle, giving international students access to the full range of courses as well as numerous opportunities to take part in campus activities and student events.",
//       },
//       {
//         month: "January & April",
//         dropText:
//           "The January intake offers a secondary start date for a number of undergraduate and postgraduate taught programs. It is particularly useful for students who require extra time to complete entry requirements or who prefer to begin their studies in the new year.",
//       },
//     ],

//     courses: {
//       description: [
//         "The University of Hertfordshire presents an extensive selection of academic programs at both undergraduate and postgraduate levels. With more than 300 degrees offered across seven Schools of Study, international students can choose from a wide variety of subjects that align with their personal goals and career ambitions.",

//         "Each program is designed with a strong industry focus, ensuring students gain not only theoretical knowledge but also valuable hands-on experience through opportunities such as work placements. Undergraduate options span diverse fields ranging from business and accounting to creative arts and sports therapy. For those pursuing advanced study, the University’s postgraduate courses provide in-depth learning, strengthen expertise, and support professional development.",
//       ],
//       items: [
//         {
//           study: "MSc Artificial Intelligence and Robotics",
//           cost: "£16,450.00",
//         },
//         { study: "MSc Management", cost: "£16,450.00" },
//         {
//           study: "MSc Supply Chain and Logistics Management",
//           cost: "£17,250.00",
//         },
//         { study: "MSc Computer Science", cost: "£17,250.00" },
//         { study: "MSc in Mechanical Engineering", cost: "£17,250.00" },
//         { study: "MBA", cost: "£18,800.00" },
//         {
//           study: "MSc Automotive Engineering",
//           cost: "£17,020.00",
//         },
//         {
//           study: "LLM Criminal Justice",
//           cost: "£17,250.00",
//         },
//         { study: "MSc Business Psychology", cost: "£17,250.00" },
//       ],
//     },

//     cost: [
//       {
//         text: [
//           "The University of Hertfordshire strives to make high-quality education accessible to students from around the world. Tuition fees are standardized annually and apply equally to both classroom-based and laboratory-based programs, though a few courses may carry different fee structures.",

//           "International students who choose to pay their tuition fees in full at or before registration are eligible for a £1,000 discount. Beyond tuition, applicants should also plan for living expenses to get a realistic view of the overall cost of studying in the UK. A detailed breakdown of confirmed tuition fees and additional costs is provided in the official offer letter upon admission.",
//         ],
//       },
//       {
//         tableData: [
//           { type: "Annual PG Tuition fee", cost: "18–20 Lakhs" },
//           { type: "Annual UG Tuition fee", cost: "16–17 Lakhs" },
//           { type: "Annual Accommodation & food expenses", cost: "12–15 Lakhs" },
//         ],
//       },
//     ],

//     Scholarships: {
//       description: [
//         "The University of Hertfordshire offers a range of scholarships designed to reward academic achievement and ease the financial commitment of studying abroad. These include merit-based awards, sports scholarships, and subject-specific funding opportunities, with most providing tuition fee reductions for eligible international students.",

//         "In many cases, applicants do not need to submit a separate application, as consideration is automatic once an offer of admission is made. Additionally, the University provides several dedicated scholarships for Indian students. The specific eligibility requirements, application steps, and deadlines vary depending on the scholarship.",
//       ],
//       items: [
//         {
//           name: "Early Bird Discount",
//           amount: "£2,000",
//           type: "Merit-based",
//           level: "Bachelors/Masters",
//         },
//         {
//           name: "Chancellor's International Scholarship",
//           amount: " £500 up to £4,000 ",
//           type: "Merit-based",
//           level: "Bachelors/Masters",
//         },
//       ],
//     },

//     Admissions: {
//       description: [
//         "Admission requirements at the University of Hertfordshire differ based on the program and level of study. Similarly, application deadlines vary depending on the chosen intake and course.",

//         "For Indian applicants, the University outlines specific entry requirements that can be reviewed in detail on the official website or relevant course pages.",
//       ],
//       items: [
//         {
//           academicRequirements: [
//             "Indian students need a minimum of 55% to 65% and above in relevant subjects depending on the course selection.",
//           ],
//           englishRequirements: [
//             "IELTS: The University of Hertfordshire IELTS requirement includes an overall IELTS score of 6/6.5 with no band less than 5.5 ",
//             " PTE : Overall score of 59 with no individual score less than 59",
//             "TOEFL : Overall score of 79 with minimum scores of 18 in Reading, 17 in Writing, 17 in Listening, and 20 in Speaking",
//             "*Note: The university may grant an English Language Waiver based on a student's 12th-grade English scores as per the education board.",
//           ],
//         },
//       ],
//     },

//     placements: {
//       description: [
//         "The University of Hertfordshire places a strong emphasis on graduate employability by offering extensive placement opportunities, dedicated career services, and connections with more than 5,500 employers. This commitment is reflected in its impressive outcomes, with 96% of graduates securing employment or progressing to further study within 15 months of completing their degree. These results highlight the University’s success in equipping students with the skills and experience needed for thriving careers.",

//         "Its close proximity to London, combined with a well-connected Hatfield campus, further enhances access to diverse professional opportunities in one of the world’s leading job markets.",
//       ],
//       jobs: [
//         { JobProfiles: "Data Scientist", AverageSalary: "30K - 50K" },
//         { JobProfiles: "Finance Analyst", AverageSalary: "40K - 50K" },
//         { JobProfiles: "Operations Manager", AverageSalary: "30K - 50K" },
//         { JobProfiles: "IT Consultant", AverageSalary: "40K - 55K" },
//         {
//           JobProfiles: "Business Analytic Manager",
//           AverageSalary: "40K - 60K",
//         },
//         {
//           JobProfiles: "Business Intelligence Analyst",
//           AverageSalary: "40K - 70K",
//         },
//         { JobProfiles: "Midwife", AverageSalary: "35K - 50K" },
//         { JobProfiles: "Media Analyst", AverageSalary: "37K - 56K" },
//         { JobProfiles: "Social Media Executive", AverageSalary: "25K - 35K" },
//       ],
//       TopRecruitersImg: [
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Airbus.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Mc_Laren.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/JP_Morgan_Chase.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/ford.webp",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/google.svg",
//         "/assets/images/university-banners/uk-banner/University of Hertfordshire/Canon.webp",
//       ],
//     },

//     gallery: [
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/1.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/3.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/4.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/2.webp",
//       "/assets/images/university-banners/uk-banner/University of Hertfordshire/5.webp",
//     ],

//     faq: [
//       {
//         question:
//           "How to apply at the University of Hertfordshire as an Indian student?",
//         answer:
//           "International students can apply to the University of Hertfordshire either by submitting the dedicated international application form or through authorized in-country representatives. For undergraduate programs, applications are processed via UCAS. Once an application is submitted, the outcome is communicated to applicants through email.",
//       },
//       {
//         question:
//           "How long does it take to get a response on the University of Hertfordshire application?",
//         answer:
//           "The admissions team generally responds quickly after an application is approved, though processing times may vary depending on the chosen course.",
//       },
//       {
//         question:
//           "Does the University of Hertfordshire consider deferring the offer to a future intake?",
//         answer:
//           "Applicants who wish to change their course after receiving an offer can do so by contacting the International Student Support team. To initiate the process, students must provide their ID number along with details of the preferred new course. The team will review the request and may ask for further information if needed.",
//       },
//       {
//         question:
//           " Is it mandatory to pay a deposit for studying at the University of Hertfordshire?",
//         answer:
//           "Students may also request to defer their course intake. This is done by completing a deferral request form to transfer the offer to the next available intake.",
//       },
//     ],
//   },

//   // {
//   //   id: "University of East London",
//   //   name: "University of East London",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (17).png",
//   //   country: "UK",
//   //   campus: "London Campus",
//   //   website: "coventryacuk.co"

//   // },
//   // {
//   //   id: "Aston University",
//   //   name: "Aston University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/AU_Birmingham_logo_Purple_RGB.png",
//   //   country: "UK",
//   //   campus: "London Campus, Birmingham Campus",
//   //   website: "coventryacuk.co"

//   // },
//   // {
//   //   id: "University of Greenwich",
//   //   name: "University of Greenwich",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University of Greenwich.png",
//   //   country: "UK",
//   //   campus: "London Campus",
//   //   website: "coventryacuk.co"

//   // },
//   // {
//   //   id: "Anglia Ruskin University",
//   //   name: "Anglia Ruskin University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/ARU-logo-1440x1080-1-1-1024x768.jpg",
//   //   country: "UK",
//   //   campus: "chelmsford Campus, Cambridge Campus, Peterborough",
//   //   website: "coventryacuk.co"

//   // },
//   // {
//   //   id: "Northumbria University",
//   //   name: "Northumbria University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Northumbria_University_Logo.png",
//   //   country: "UK",
//   //   campus: "New Castle Campus, London Campus",
//   //   website: "www.herts.ac.uk"
//   // },
//   // {
//   //   id: "Edinburgh Napier University",
//   //   name: "Edinburgh Napier University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Edinburgh Napier University.png",
//   //   country: "UK",
//   //   campus: "Edinburgh Campus",
//   //   website: "www.napier.ac.uk"
//   // },
//   // {
//   //   id: "Teesside University",
//   //   name: "Teesside University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/TU.png",
//   //   country: "UK",
//   //   campus: "Middlesbrough, London Campus",
//   //   website: "www.tees.ac.uk"
//   // },
//   //  {
//   //   id: "Sheffield Hallam University",
//   //   name: "Sheffield Hallam University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Sheffield Hallam University.png",
//   //   country: "UK",
//   //   campus: "Sheffiled",
//   //   website: "www.shu.ac.uk"
//   // },
//   //  {
//   //   id: "University of Essex",
//   //   name: "University of Essex",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Essex_logo-removebg-preview.png",
//   //   country: "UK",
//   //   campus: "Colchester",
//   //   website: "www.essex.ac.uk"
//   // },
//   //  {
//   //   id: "Nottingham Trent University",
//   //   name: "Nottingham Trent University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/nottingham-trent-university-logo-square.png",
//   //   country: "UK",
//   //   campus: "Nottingham",
//   //   website: "www.truestudent.com"
//   // },
//   //  {
//   //   id: "Cardiff Metropolitan University",
//   //   name: "Cardiff Metropolitan University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/cardiff-university.png",
//   //   country: "UK",
//   //   campus: "Llandaff Campus",
//   //   website: "www.cardiffmet.ac.uk"
//   // },
//   //  {
//   //   id: "Heriot Watt University",
//   //   name: "Heriot Watt University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Heriot-Watt_University_logo.svg-removebg-preview.png",
//   //   country: "UK",
//   //   campus: "Edinburgh Campus",
//   //   website: "www.hw.ac.uk"
//   // },
//   //  {
//   //   id: "Ravensbourne University",
//   //   name: "Ravensbourne University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Ravensbourne University.png",
//   //   country: "UK",
//   //   campus: "London Campus",
//   //   website: "www.ravensbourne.ac.uk"
//   // },
//   //  {
//   //   id: "BPP University",
//   //   name: "BPP University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/logo-bpp-university.png",
//   //   country: "UK",
//   //   campus: "London Campus, Manchester Campus",
//   //   website: "www.bpp.com"
//   // },
//   //  {
//   //   id: "University of Roehampton",
//   //   name: "University of Roehampton",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Roehampton_logo.png",
//   //   country: "UK",
//   //   campus: "London Campus",
//   //   website: "www.roehampton.ac.uk"
//   // },
//   //  {
//   //   id: "De Mont Fort University",
//   //   name: "De Mont Fort University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/images (1).png",
//   //   country: "UK",
//   //   campus: "Liecester Campus",
//   //   website: "www.dmu.ac.uk"
//   // },
//   //  {
//   //   id: "London Metropolitan University",
//   //   name: "London Metropolitan University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/London Metropolitan University.svg",
//   //   country: "UK",
//   //   campus: "Liecester Campus, London Moorgate Campus",
//   //   website: "www.dmu.ac.uk"
//   // },
//   //  {
//   //   id: "Birmingham City University",
//   //   name: "Birmingham City University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/bcu-birmingham-city-university5078.jpg",
//   //   country: "UK",
//   //   campus: "Birmingham Campus",
//   //   website: "www.bcu.ac.uk"
//   // },
//   //  {
//   //   id: "Middlesex University",
//   //   name: "Middlesex University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/Middlesex University.png",
//   //   country: "UK",
//   //   campus: "London Campus",
//   //   website: "www.mdx.ac.uk"
//   // },
//   //  {
//   //   id: "University of Liecester",
//   //   name: "University of Liecester",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/University_of_Leicester_logo_pillars.jpg",
//   //   country: "UK",
//   //   campus: "Liecester Campus",
//   //   website: "www.prospects.ac.uk"
//   // },
//   //  {
//   //   id: "University of Portsmouth",
//   //   name: "University of Portsmouth",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/uk universities logos/university-of-portsmouth.png",
//   //   country: "UK",
//   //   campus: "Portsmouth Campus",
//   //   website: "www.port.ac.uk"
//   // },

//   //  {
//   //   id: "University of Maryland Baltimore county",
//   //   name: "University of Maryland Baltimore county",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UMBC-logo-with-honors-tagline.png",
//   //   country: "USA",
//   //   campus: "Baltimore, Maryland",
//   //   website: "www.umbc.edu"
//   // },
//   //  {
//   //   id: "Arizona State University",
//   //   name: "Arizona State University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/arizona-state-university.webp",
//   //   country: "USA",
//   //   campus: "Tempe, Polytechnic, Tempe, West",
//   //   website: "www.asu.edu"
//   // },

//   //  {
//   //   id: "California State University",
//   //   name: "California State University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/california-state-university-long-beach2264-removebg-preview.png",
//   //   country: "USA",
//   //   campus: "Long Beach, Fullerton, San Bernardino, Chico, East Bay, Sacaramento, Los Angeles",
//   //   website: "www.csulb.edu"
//   // },
//   //  {
//   //   id: "University of North Texas",
//   //   name: "University of North Texas",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University of North Texas.svg",
//   //   country: "USA",
//   //   campus: "Long Beach, Fullerton, San Bernardino, Chico, East Bay, Sacaramento, Los Angeles",
//   //   website: "www.unt.edu"
//   // },
//   //  {
//   //   id: "University of Cincinnati",
//   //   name: "University of Cincinnati",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University of Cincinnati.png",
//   //   country: "USA",
//   //   campus: "West campus, Cincinnati, Ohio",
//   //   website: "www.unt.edu"
//   // },
//   //  {
//   //   id: "University of Missouri",
//   //   name: "University of Missouri",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/University-of-Missouri-Logo.png",
//   //   country: "USA",
//   //   campus: "Saint Louis, Missouri",
//   //   website: "www.missouri.edu"
//   // },
//   //  {
//   //   id: "Northwest Missouri State University",
//   //   name: "Northwest Missouri State University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Northwest Missouri State University.png",
//   //   country: "USA",
//   //   campus: "Maryville, Missouri",
//   //   website: "www.nwmissouri.edu"
//   // },
//   //  {
//   //   id: "George Mason University",
//   //   name: "George Mason University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/George_Mason_University_logo.svg.png",
//   //   country: "USA",
//   //   campus: "Fairfax, Virginia",
//   //   website: "www.gmu.edu"
//   // },
//   //  {
//   //   id: "University of Alabama at Birmingham",
//   //   name: "University of Alabama at Birmingham",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UAB-color-with-R-standard_FullColor.png",
//   //   country: "USA",
//   //   campus: "Birmingham, Alabama",
//   //   website: "www.uab.edu"
//   // },
//   //  {
//   //   id: "Oregon State University",
//   //   name: "Oregon State University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Oregon State University.svg",
//   //   country: "USA",
//   //   campus: "Corvallis, Oregon",
//   //   website: "www.oregonstate.edu"
//   // },
//   //  {
//   //   id: "University of Central Florida",
//   //   name: "University of Central Florida",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/UCF-Logo.png",
//   //   country: "USA",
//   //   campus: "Orlando, Florida",
//   //   website: "www.ucf.edu"
//   // },
//   //  {
//   //   id: "Florida Atlantic University",
//   //   name: "Florida Atlantic University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/florida-atlantic-logo-wordmark.png",
//   //   country: "USA",
//   //   campus: "Orlando, Florida",
//   //   website: "www.fau.edu"
//   // },
//   //  {
//   //   id: "University of Oklahoma",
//   //   name: "University of Oklahoma",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Oklahoma_City_University_logo.svg.png",
//   //   country: "USA",
//   //   campus: "Norman, Oklahoma",
//   //   website: "www.ou.edu"
//   // },
//   //  {
//   //   id: "Webster University",
//   //   name: "Webster University",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/Webster University.png",
//   //   country: "USA",
//   //   campus: "St. Louis, Missouri & San Antonio Texas",
//   //   website: "www.webster.edu"
//   // },
//   //  {
//   //   id: "University of Illinois Spring Field",
//   //   name: "University of Illinois Spring Field",
//   //   logo: "/assets/images/LOGOS OF COUNTRIES WISE UNIVERSITIES/USA Universities Logos/images (27).png",
//   //   country: "USA",
//   //   campus: "Springfield, Illinois",
//   //   website: "www.uis.edu"
//   // },
// ];

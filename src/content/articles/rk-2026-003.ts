import { Article } from "../../lib/types";

import figure1Img from "./article_images/rk-2026-003_fig01_assessment_pipeline.svg";
import figure2Img from "./article_images/rk-2026-003_fig02_recognition_and_portions.svg";
import figure3Img from "./article_images/rk-2026-003_fig03_nutrient_database.svg";
import figure4Img from "./article_images/rk-2026-003_fig04_validation_comparison.svg";

const article: Article = {
  id: "RK-2026-003",
  title: "AI in Dietary Assessment: Food Recognition, Portion Estimation and Nutrient Analysis",
  date: "2026-11-26",
  tags: ["#DietaryAssessment", "#FoodRecognition", "#NutrientAnalysis", "#FoodAI", "#FoodScience"],
  type: "report",
  template: "standard",
  readTime: "29 min",
  author: {
    name: "RK Patel",
    role: "Microbiologist",
    avatar: "https://github.com/RKPatel-1996.png",
    affiliation: "Gujarat University",
  },
  excerpt: `How can a photograph or dietary record become a defensible estimate of nutrient intake? This introductory article connects the machine-learning concepts of classification and regression to dietary-assessment apps, nutrient-analysis software, food-composition databases and portion estimation. It examines the published FoodAI system, FRANI validation evidence, and an Indian mixed-meal example, emphasizing measurement error and scientific verification.`,
  content: `
<article>
  <p><strong>From our previous lesson:</strong> We learned that a machine-learning model can use features from training examples to make a prediction, and that its prediction must be evaluated on appropriate new data. Our next question is directly relevant to nutrition: <strong>Can a computer help us record what someone ate, estimate the amount eaten and calculate the nutrients consumed?</strong></p>
  <p>This question is more difficult than it first appears. A camera can collect an image, but an image is not a measured portion weight. A food name does not necessarily identify its ingredients, recipe or nutrient content. Even a neatly calculated number may be wrong if the food or quantity entered was wrong. This article connects AI methods to <strong>dietary-assessment applications, nutrient-analysis software, food recognition and image-based portion estimation</strong>—the corresponding topics in MSC-FNS-106 Unit II.</p>
  <p>We will distinguish three kinds of evidence throughout: <strong>established dietary-assessment methods</strong> documented by nutrition institutions, <strong>research systems</strong> described in published studies, and <strong>illustrative classroom workflows</strong> that are not results from a deployed app. We are studying how these technologies work and how to assess them, not endorsing a commercial product or giving individual dietary advice.</p>

  <h2>Learning objectives</h2>
  <p>After reading, you should be able to:</p>
  <ol>
    <li>Compare a 24-hour dietary recall, a food record and a food-frequency questionnaire.</li>
    <li>Explain where AI-based classification, image segmentation and numerical estimation may assist a dietary-assessment workflow.</li>
    <li>Describe how food-composition data and recorded portion quantities are combined to calculate nutrient intake.</li>
    <li>Explain what FoodAI was designed to demonstrate and what cannot be inferred from food-recognition performance alone.</li>
    <li>Interpret the purpose and limits of a real validation study comparing AI-assisted dietary assessment with weighed food records.</li>
  </ol>

  <h2>1. What are we actually trying to measure?</h2>
  <p><strong>Dietary assessment</strong> is the process of obtaining information about foods and beverages consumed by a person or group. Depending on the research question, an investigator might need a description of yesterday's intake, a record of meals over several days, or information about habitual consumption patterns. The method must match the intended question.<sup><a href="#ref1">1</a></sup></p>
  <p>The critical scientific distinction is between <strong>actual consumption</strong>, <strong>what was recorded or reported</strong>, and <strong>the nutrient intake estimated from that report</strong>. Each may differ because of forgotten foods, inaccurate portion estimates, recipe variation or imperfect food-composition matches.</p>

  <table class="science-table" data-id="rk003-table-01-methods">
    <caption>Table 1: Common dietary-assessment methods and their principal trade-offs.</caption>
    <thead>
      <tr><th scope="col">Method</th><th scope="col">What the person provides</th><th scope="col">Useful for</th><th scope="col">Important limitation</th></tr>
    </thead>
    <tbody>
      <tr><td>24-hour dietary recall (24HR)</td><td>Foods, drinks, approximate amounts and preparation details consumed during the previous day</td><td>Detailed short-period intake</td><td>Depends on memory and reporting; one day does not define usual intake</td></tr>
      <tr><td>Food record or diary</td><td>Foods and quantities recorded near the time of consumption</td><td>Prospective meal-level detail</td><td>Recording burden; recording may change eating behavior</td></tr>
      <tr><td>Food-frequency questionnaire (FFQ)</td><td>How often selected foods are usually consumed over a stated period</td><td>Broad habitual dietary patterns</td><td>Less detail about individual meals and quantities; depends on the questionnaire design</td></tr>
    </tbody>
  </table>
  <p>The US National Cancer Institute (NCI) provides a <a href="https://epi.grants.cancer.gov/dietary-assessment-primer/profiles/table.html" target="_blank" rel="noopener noreferrer">comparison of these instruments</a>. It also provides <strong>ASA24</strong> (Automated Self-Administered 24-Hour Dietary Assessment Tool), which supports structured dietary recalls and food records.<sup><a href="#ref1">1</a></sup><sup><a href="#ref2">2</a></sup> An automated questionnaire can be valuable even when it does not use computer vision or a machine-learning classifier. <strong>Digital automation and artificial intelligence are not synonyms.</strong></p>

  <h2>2. From a food photograph to a nutrient estimate</h2>
  <p>In Article 2, we met <strong>classification</strong> (predicting a category) and <strong>regression</strong> (estimating a number). Here these concepts become practical. A food photograph may contain several foods, and each one has to be identified, measured or estimated, and matched to nutrient-composition information before an intake estimate is possible.<sup><a href="#ref7">7</a></sup></p>

  <figure class="science-figure" data-id="FIG-1" data-clean-src="${figure1Img}">
    <img src="${figure1Img}" alt="Six-stage schematic from a meal photograph or dietary report through food recognition, portion estimation, composition database matching, nutrient calculation and human verification." />
    <figcaption>Figure 1: A conceptual dietary-assessment pipeline. These stages may use different technologies and may require human input. A completed nutrient estimate does not necessarily imply that every stage used AI or that the result is validated.</figcaption>
  </figure>

  <h3>Stage A: Food recognition and image segmentation</h3>
  <p>A computer-vision model may examine image features to <strong>classify</strong> a food, for example deciding whether a visible item resembles rice or chapati. <strong>Detection</strong> attempts to locate food items; <strong>segmentation</strong> identifies the pixels or regions attributed to different items. A photograph with dal, rice, roti and vegetables is more demanding than a photograph containing one isolated, visually distinctive food.</p>
  <p>The label output is not proof of what was actually consumed. A prediction can be wrong; a dish may be partly covered; foods that look alike can have different ingredients. Training with one cuisine does not guarantee equal performance with another cuisine.<sup><a href="#ref7">7</a></sup><sup><a href="#ref10">10</a></sup></p>

  <h3>Stage B: Estimating a portion</h3>
  <p>Correctly identifying <em>rice</em> does not tell us whether the portion contains 50 g, 150 g or another mass. Portion estimation may require an object with known dimensions, additional views, depth information, a calibrated container, manual user entry or a separate measurement system. A single two-dimensional photograph does not directly supply the depth, density and hidden volume needed to determine edible mass reliably.<sup><a href="#ref7">7</a></sup></p>

  <figure class="science-figure" data-id="FIG-2" data-clean-src="${figure2Img}">
    <img src="${figure2Img}" alt="Illustrated mixed Indian meal with rice, dal, roti and vegetables followed by distinct recognition and portion estimation questions, emphasizing that food identification does not give mass." />
    <figcaption>Figure 2: Different questions require different measurements. Food recognition asks what is visible; portion estimation asks how much was served and eaten. The meal drawing is illustrative, not a photograph processed by a trained model.</figcaption>
  </figure>
  <p>For a meal recorded before eating, we may also need information about <strong>leftovers</strong>. A photograph of food served is not automatically a record of food consumed. For mixed dishes, the proportion of ingredients and absorbed oil can be particularly uncertain. These are measurement problems, not merely software-interface problems.</p>

  <h2>3. Nutrient analysis: where the food-composition database enters</h2>
  <p>Once a food and its edible amount have been recorded, nutrient-analysis software can match the item with data on its energy, protein, fat, carbohydrate, fibre and other components. The calculation is often ordinary arithmetic applied to a food-composition table; the database lookup and multiplication do <strong>not inherently require machine learning</strong>.<sup><a href="#ref3">3</a></sup><sup><a href="#ref4">4</a></sup></p>
  <p>For a nutrient reported in grams per 100 g of edible food, the basic calculation is:</p>
  <p><strong>Estimated nutrient amount (g) = edible portion (g) × reference nutrient value (g per 100 g) ÷ 100.</strong></p>
  <p>For example, in a <strong>fictional arithmetic exercise only</strong>, assume a food has 4 g of a nutrient per 100 g and that 150 g of its edible portion was consumed. The calculated quantity would be <strong>6 g</strong>. These numbers are invented solely to demonstrate multiplication; they are <em>not</em> nutrient-composition values for rice, dal, roti or any other real food. For real analysis, the composition value must come from a documented, suitably matched database record.</p>

  <figure class="science-figure" data-id="FIG-3" data-clean-src="${figure3Img}">
    <img src="${figure3Img}" alt="Nutrient calculation diagram with edible portion mass, a verified nutrient value per 100 grams, calculation, and a warning that recipe matching and units must be checked." />
    <figcaption>Figure 3: The calculation stage. Even mathematically correct arithmetic can produce a misleading estimate if the portion, food identity, cooking state, edible fraction or nutrient-database match is wrong.</figcaption>
  </figure>

  <h3>Which databases should scientists trust?</h3>
  <p>The <strong>USDA FoodData Central</strong> platform offers several data types rather than one interchangeable list. Its Food and Nutrient Database for Dietary Studies (FNDDS) supports foods reported in the US What We Eat in America/NHANES dietary survey; Foundation Foods provides detailed information about individual commodity and minimally processed foods. These datasets have different coverage and provenance.<sup><a href="#ref3">3</a></sup></p>
  <p>For Indian food science, the <strong>ICMR–National Institute of Nutrition Indian Food Composition Tables (IFCT 2017)</strong> are a directly relevant foundational reference.<sup><a href="#ref5">5</a></sup> An Indian food-composition database development study published in 2024 described a compilation containing <strong>1,095 individual food items</strong> and <strong>1,014 commonly consumed recipes</strong>, drawing primarily on the 2017 IFCT and supplementing gaps from other documented sources.<sup><a href="#ref6">6</a></sup> These figures describe that particular research compilation; they do not establish exhaustive coverage of every Indian food or recipe.</p>
  <p><strong>FAO/INFOODS</strong> emphasizes food-composition data quality and the importance of nationally or regionally relevant data.<sup><a href="#ref4">4</a></sup> A food identified by the same name may differ in ingredients, cooking method, water content, edible fraction or added fat. A model cannot recover these properties reliably from a food name alone.</p>

  <table class="science-table" data-id="rk003-table-02-roles">
    <caption>Table 2: Roles of different computational components in nutrient assessment.</caption>
    <thead>
      <tr><th scope="col">Component</th><th scope="col">Main input</th><th scope="col">Typical output</th><th scope="col">Requires ML?</th></tr>
    </thead>
    <tbody>
      <tr><td>Food-image classifier</td><td>Photograph and learned model parameters</td><td>Candidate food category</td><td>Commonly yes in modern research systems</td></tr>
      <tr><td>Portion estimator</td><td>Image plus scaling, geometry or other measurements</td><td>Estimated mass or volume</td><td>May use ML or other measurement methods</td></tr>
      <tr><td>Food-composition lookup</td><td>Identified food and suitable database record</td><td>Nutrient values for a defined amount</td><td>No, not necessarily</td></tr>
      <tr><td>Nutrient arithmetic</td><td>Edible amount and nutrient concentration</td><td>Calculated nutrient amount</td><td>No</td></tr>
      <tr><td>Quality review</td><td>Original record, estimates and supporting evidence</td><td>Corrections, uncertainty and fitness-for-purpose decision</td><td>Requires scientific judgment</td></tr>
    </tbody>
  </table>

  <h2>4. Research application: FoodAI for food-image recognition</h2>
  <p>A well-documented example is <strong>FoodAI</strong>, described by Sahoo and colleagues in a 2019 ACM SIGKDD research paper. The system was developed in Singapore to support smart food logging through deep-learning-based recognition of food images. Its reported training corpus contained <strong>400,000 images from 756 food classes</strong>, with particular attention to foods commonly consumed in Singapore.<sup><a href="#ref8">8</a></sup></p>
  <p>To connect this with Article 2: training examples contain images and corresponding food-class labels; an image model learns features that help it assign a class to a new photograph. This is a <strong>classification application</strong>. The 2019 paper also described an API deployment and integration with the Healthy 365 app at the time of publication.<sup><a href="#ref8">8</a></sup> These historical statements should not be read as a claim about the system's present availability, present food-class coverage or performance with Indian mixed dishes.</p>
  <p><strong>What FoodAI demonstrates:</strong> machine learning can assist the difficult task of assigning food labels from images. <strong>What its reported image-training corpus does not establish:</strong> accurate gram weights, nutrient quantities, individualized medical recommendations or generalizable performance in every cuisine. Those require additional methods and evaluation.</p>
  <p><em>Terminology caution:</em> several unrelated commercial offerings use the name “FoodAI.” In this article the term refers specifically to the <strong>Sahoo et al. (2019) academic system</strong>, not to every application with a similar product name.</p>

  <h2>5. Research application: does an AI-assisted dietary record agree with measured intake?</h2>
  <p>Recognition is only one part of a complete dietary-assessment system. A stronger question is whether the final estimates agree with a meaningful reference method. <strong>FRANI</strong> (Food Recognition Assistance and Nudging Insights) is a separate research application that uses computer vision to assist dietary recording.</p>
  <p>In a <strong>2024 Ghanaian validation study</strong>, Gelli and colleagues compared FRANI with <strong>weighed food records (WR)</strong> and conventional <strong>24-hour recalls (24HR)</strong>. The study assessed intake on two nonconsecutive days among <strong>64 female participants aged 18–24 years</strong> in Accra, Ghana.<sup><a href="#ref9">9</a></sup> This was not an evaluation of FoodAI and not a study in Indian adults.</p>

  <figure class="science-figure" data-id="FIG-4" data-clean-src="${figure4Img}">
    <img src="${figure4Img}" alt="Three-method FRANI validation design comparing app-assisted dietary recording and conventional 24-hour recall with weighed food records, showing the need to inspect errors and nutrient agreement." />
    <figcaption>Figure 4: Schematic of the published 2024 FRANI study comparison. Weighed food records provided the reference; FRANI and conventional 24-hour recall were separate assessment methods. This diagram does not show participant-level results.</figcaption>
  </figure>

  <p>The researchers reported that FRANI's nutrient-intake estimates performed comparably to 24-hour recalls in that study population, while also identifying food-recording errors. Relative to weighed records, <strong>15% omission</strong> and <strong>22% intrusion</strong> errors were reported for FRANI food-consumption episodes.<sup><a href="#ref9">9</a></sup> An <em>omission</em> means a consumed item was missing from the record; an <em>intrusion</em> means an item was recorded that did not belong in the reference consumption record. These are different error types and should not be combined into a single accuracy percentage.</p>
  <p><strong>Interpretation:</strong> this study provides evidence that an AI-assisted workflow can produce useful intake estimates under defined conditions. It does <strong>not</strong> establish error-free food detection, perfect micronutrient estimation, suitability for every population or proven improvement in clinical outcomes. Results from Ghana should not automatically be transferred to Gujarati meals without representative evaluation.</p>
  <p>A 2025 systematic review by Cofre and colleagues identified substantial variation among AI-based dietary-assessment systems, evaluation methods, populations and nutrient outcomes. Such heterogeneity limits simple claims that a single app or technology is universally accurate.<sup><a href="#ref10">10</a></sup> A separate systematic review of image-based dietary assessment also highlights why studies should compare estimates with appropriate reference measurements rather than reporting food-classification accuracy alone.<sup><a href="#ref11">11</a></sup></p>

  <h2>6. Applying the workflow to a familiar Indian meal</h2>
  <p>Imagine a student's meal photograph containing <strong>roti, dal, rice and sabzi</strong>. Our task is not to let a model invent a precise calorie value. Instead, we should identify what additional information would be needed to make a defensible estimate.</p>
  <ol>
    <li><strong>Identify the components.</strong> What foods are visible? Could a visual label be confused with a similar dish?</li>
    <li><strong>Record the actual quantity eaten.</strong> How much was served, and was any left over? Is a weighed portion available?</li>
    <li><strong>Describe the recipe.</strong> What type of dal and vegetables were used? Was oil or ghee added? Is the food raw, boiled or fried?</li>
    <li><strong>Match foods to documented composition entries.</strong> Does the selected database represent the local recipe, edible portion and preparation state?</li>
    <li><strong>Calculate and verify.</strong> Are units and per-100-g denominators consistent? Which values came from measurement, estimates or assumptions?</li>
  </ol>

  <table class="science-table" data-id="rk003-table-03-indian-meal">
    <caption>Table 3: Information that may be missing when nutrient intake is estimated from a mixed Indian meal photograph.</caption>
    <thead><tr><th scope="col">Visible food</th><th scope="col">What a photograph might suggest</th><th scope="col">What still requires confirmation</th></tr></thead>
    <tbody>
      <tr><td>Roti</td><td>Flatbread category and approximate outline</td><td>Flour type, mass, added fat and number actually consumed</td></tr>
      <tr><td>Dal</td><td>Pulse-based cooked dish</td><td>Pulse identity, water-to-solid ratio, oil or ghee, serving mass</td></tr>
      <tr><td>Rice</td><td>Cooked rice category</td><td>Cooked edible mass and recipe ingredients</td></tr>
      <tr><td>Sabzi</td><td>Vegetable dish</td><td>Vegetable mix, cooking method, oil and portion mass</td></tr>
    </tbody>
  </table>

  <p>For research in an Indian context, a reasonable starting point is the documented IFCT and an appropriately validated recipe resource, not an arbitrary foreign food label matched only by name.<sup><a href="#ref5">5</a></sup><sup><a href="#ref6">6</a></sup> The purpose of this exercise is to <strong>expose uncertainty</strong>, not to produce unverified nutrient totals.</p>

  <h2>7. How should we judge whether a dietary AI tool works?</h2>
  <p>The same principles from Article 2 now become evaluation questions. The appropriate test depends on the intended use. A researcher should ask:</p>
  <dl>
    <dt><strong>Food identification</strong></dt><dd>How often are foods correctly recognized? Which foods are omitted or falsely included? Were test images from participants and environments not used during training?</dd>
    <dt><strong>Portion estimation</strong></dt><dd>How far do estimated grams or volumes differ from measured portions? Are the errors reported separately for different foods and meal types?</dd>
    <dt><strong>Nutrient estimation</strong></dt><dd>How closely do energy and individual nutrient estimates agree with a justified reference method? Is systematic overestimation or underestimation examined?</dd>
    <dt><strong>Generalization</strong></dt><dd>Does performance hold across cuisines, phones, lighting, mixed dishes, age groups and intended use settings?</dd>
    <dt><strong>Scientific use</strong></dt><dd>Can users correct mistakes? Can the source of food-composition values be traced? Are privacy, consent and limitations documented?</dd>
  </dl>
  <p><strong>Classification accuracy alone cannot validate nutrient intake.</strong> Even when a food label is correct, a poor portion estimate or mismatched nutrient entry can produce an incorrect final number. Nor does agreement for group-average energy intake guarantee accurate estimates for each person. Before clinical or public-health use, the tool needs evaluation appropriate to the decision it is expected to support.<sup><a href="#ref10">10</a></sup><sup><a href="#ref11">11</a></sup></p>
  <p>We will examine personalized nutrition, obesity and diabetes prediction, recommendation systems, data privacy and bias in later articles. They are potential downstream applications, not proven consequences of recognizing food in an image.</p>

  <h2>8. Classroom activity: audit a dietary-assessment claim</h2>
  <p>Choose a <strong>non-identifying, voluntarily provided</strong> food photograph or a teacher-supplied sample meal description. Do not upload another person's dietary photograph or health record to an external service without appropriate permission. The task can be completed as a paper exercise without signing up for an app.</p>
  <ol>
    <li>Write down the foods you can identify confidently and the foods that remain uncertain.</li>
    <li>List at least three measurements or details still needed to estimate consumed quantities.</li>
    <li>Choose a documented food-composition source (for example, ICMR-NIN IFCT or USDA FoodData Central) and explain why its food entry is or is not suitable.</li>
    <li>Specify what would count as a reference measurement for the food identity, portion size and nutrient estimate.</li>
    <li>Write a conclusion that separates observations, assumptions, calculations and claims that require validation.</li>
  </ol>
  <p><strong>One-mark revision:</strong> What is a 24-hour dietary recall? What is food classification? Why is a portion-size estimate needed? Name one food-composition database.</p>
  <p><strong>Five-mark revision:</strong> Explain the stages by which a food photograph may be converted into an estimated nutrient intake, identifying where AI may assist and where measurement, food-composition information and validation are still necessary.</p>

  <h2>Takeaway: recognition is not the same as dietary measurement</h2>
  <p>Article 1 taught us to examine health and diet measurements carefully; Article 2 explained how ML models learn from examples. This article demonstrates a concrete application: a trained model may help recognize foods, but <strong>reliable dietary assessment requires more than a plausible category label</strong>. Quantity, recipe, nutrient-composition matching, consumption versus serving, reference validation and honest reporting of errors all matter. The scientifically useful question is not just <em>“Can the app identify the meal?”</em> but <em>“How well can the complete method estimate what was actually consumed, for whom, and under what conditions?”</em></p>

  <h2>References</h2>
  <p>References below combine authoritative dietary-assessment and food-composition resources with identifiable peer-reviewed research. Historical system characteristics are attributed to their original papers; neither FoodAI nor FRANI is presented as a clinical recommendation. The figures are original explanatory schematics created for this article.</p>
  <ol>
    <li id="ref1"><a href="https://epi.grants.cancer.gov/dietary-assessment-primer/profiles/table.html" target="_blank" rel="noopener noreferrer">US National Cancer Institute. Dietary Assessment Primer: Comparing Dietary Assessment Instruments.</a></li>
    <li id="ref2"><a href="https://epi.grants.cancer.gov/asa24/" target="_blank" rel="noopener noreferrer">US National Cancer Institute. Automated Self-Administered 24-Hour (ASA24) Dietary Assessment Tool.</a></li>
    <li id="ref3"><a href="https://fdc.nal.usda.gov/data-documentation/" target="_blank" rel="noopener noreferrer">USDA. FoodData Central: Data Type Documentation.</a></li>
    <li id="ref4"><a href="https://www.fao.org/food-composition/en" target="_blank" rel="noopener noreferrer">FAO/INFOODS. Food Composition: Data, standards and quality.</a></li>
    <li id="ref5"><a href="https://www.nin.res.in/ebooks/IFCT2017.pdf" target="_blank" rel="noopener noreferrer">ICMR–National Institute of Nutrition. Indian Food Composition Tables (2017).</a></li>
    <li id="ref6"><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11277795/" target="_blank" rel="noopener noreferrer">Development of an Indian Food Composition Database (2024). Peer-reviewed research; PMID 39071807.</a></li>
    <li id="ref7"><a href="https://doi.org/10.1093/advances/nmac078" target="_blank" rel="noopener noreferrer">Applying Image-Based Food-Recognition Systems on Dietary Assessment: A Systematic Review (2022). Advances in Nutrition.</a></li>
    <li id="ref8"><a href="https://doi.org/10.1145/3292500.3330734" target="_blank" rel="noopener noreferrer">Sahoo D et al. (2019). FoodAI: Food Image Recognition via Deep Learning for Smart Food Logging. ACM SIGKDD.</a></li>
    <li id="ref9"><a href="https://doi.org/10.1016/j.ajcnut.2024.08.011" target="_blank" rel="noopener noreferrer">Gelli A et al. (2024). Computer vision–assisted dietary assessment through mobile phones in female youth in urban Ghana: Validity against weighed records and comparison with 24-h recalls. American Journal of Clinical Nutrition.</a></li>
    <li id="ref10"><a href="https://doi.org/10.1017/S0007114525000522" target="_blank" rel="noopener noreferrer">Cofre S et al. (2025). Validity and accuracy of artificial intelligence-based dietary intake assessment methods: A systematic review. British Journal of Nutrition.</a></li>
    <li id="ref11"><a href="https://doi.org/10.1080/07853890.2023.2273497" target="_blank" rel="noopener noreferrer">AI-based digital image dietary assessment methods compared to humans and ground truth: A systematic review (2023). Annals of Medicine.</a></li>
  </ol>
</article>
  `,
};

export default article;

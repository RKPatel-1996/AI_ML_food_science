import { Article } from "../../lib/types";

import figure1Img from "./article_images/rk-2026-001_fig01_measurement_coverage.svg";
import figure2Img from "./article_images/rk-2026-001_fig02_age_bmi_counts.svg";
import figure3Img from "./article_images/rk-2026-001_fig03_age_bmi_percentages.svg";
import figure4Img from "./article_images/rk-2026-001_fig04_dietary_energy.svg";

const article: Article = {
  id: "RK-2026-001",
  title: "Why Do Health Sciences Need AI? From Research Questions to Reliable Data",
  date: "2026-10-22",
  tags: ["#AIHealthSciences", "#NHANES", "#HealthData", "#FoodScience"],
  type: "report",
  template: "standard",
  readTime: "16 min",
  author: {
    name: "RK Patel",
    role: "Microbiologist",
    avatar: "https://github.com/RKPatel-1996.png",
    affiliation: "Gujarat University",
  },
  excerpt: `An introductory lesson on why artificial intelligence and data-driven methods matter in health sciences. Using descriptive observations from the 2017–2018 National Health and Nutrition Examination Survey, students learn how research questions, measurements, missing data, denominators, and validation shape scientific interpretation. The article distinguishes statistical description from machine-learning prediction and explains why neither replaces sound research design.`,
  content: `
<article>
  <p>Why might two people who report similar diets have different health measurements? One may have a different age, activity pattern, medical history, or measurement history. The question is scientifically interesting, but it cannot be answered by immediately opening an artificial intelligence (AI) tool. First, researchers must decide what they want to know, which observations they need, and what conclusions those observations can support.</p>

  <p>This lesson introduces AI through a health-science problem rather than through an algorithm. It uses real, publicly documented observations from the US National Health and Nutrition Examination Survey (NHANES) 2017–2018 to show why data interpretation comes before predictive modelling. All numerical examples below are <strong>descriptive, unweighted counts from the lecture's audited analysis</strong>, not results of a trained AI model and not estimates of the US population.</p>

  <h2>1. Begin with a research question, not an AI model</h2>
  <p>Consider the question: <strong>Why might people with similar reported dietary intake differ in a health measurement?</strong> To investigate it, researchers might record dietary intake, age, body measurements, physical activity, and relevant clinical context. They would then examine how these measurements vary and whether any relationships are consistent with the research question.</p>
  <p>Notice the sequence. A research question determines which measurements matter. The measurements determine which analyses are possible. Only then should researchers consider whether a machine-learning model would offer a useful additional method.</p>
  <ol>
    <li><strong>Ask:</strong> Define a question that could be investigated with observations.</li>
    <li><strong>Measure:</strong> Identify variables, units, sampling procedures, and limitations.</li>
    <li><strong>Describe:</strong> Inspect the available records, distributions, and missing values.</li>
    <li><strong>Analyse:</strong> Choose statistical or computational methods appropriate to the question.</li>
    <li><strong>Validate and interpret:</strong> Decide what the evidence supports and what remains uncertain.</li>
  </ol>
  <p><strong>Key idea:</strong> AI can assist with pattern recognition and prediction, but a sophisticated model cannot repair an unsuitable research question or make weak measurements reliable.</p>

  <h2>2. What kinds of data occur in health research?</h2>
  <p>A single participant can contribute different forms of evidence. For example, a dietary recall records <em>reported</em> food intake, an examination measures height or weight, and a laboratory assay measures a biological quantity in a collected sample. Survey responses, wearable-device observations, and molecular profiles can provide additional perspectives. They are not interchangeable measurements.</p>
  <dl>
    <dt><strong>Dietary recall</strong></dt>
    <dd>A report of foods and drinks consumed during a specified period; its interpretation depends on memory, reporting, and the recall period.</dd>
    <dt><strong>Anthropometry</strong></dt>
    <dd>Physical measurements such as height, weight, and body mass index (BMI). BMI is a derived indicator, not a direct measurement of body fat.</dd>
    <dt><strong>Laboratory measurement</strong></dt>
    <dd>An assay result, such as a glucose concentration, dependent on sampling conditions, laboratory procedures, and eligibility.</dd>
    <dt><strong>Digital and molecular measurements</strong></dt>
    <dd>Measurements from devices or laboratory profiling methods, each with its own resolution, units, and sources of error.</dd>
  </dl>
  <p>Even when these data relate to the same participant, they may have been recorded on different days, under different protocols, or only for specific subgroups. The meaning of a number depends on <strong>how, when, and from whom</strong> it was obtained.</p>

  <h2>3. Real example: one survey, different measurement coverage</h2>
  <p>NHANES combines interviews, physical examinations, and laboratory components. Its 2017–2018 public-use files can be linked using the participant identifier <code>SEQN</code>, but joining files does not mean that every participant has every variable. Some components involve subsampling or different eligibility rules. <sup><a href="#ref1">1</a></sup><sup><a href="#ref2">2</a></sup><sup><a href="#ref3">3</a></sup><sup><a href="#ref4">4</a></sup></p>

  <table class="science-table" data-id="rk-2026-001-table-1">
    <caption>Table 1: Observed availability of four selected measurements in the audited NHANES 2017–2018 teaching analysis. Counts are unweighted.</caption>
    <thead>
      <tr>
        <th scope="col">Measurement</th>
        <th scope="col">NHANES variable</th>
        <th scope="col">Participants with an observed value</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Age</td><td><code>RIDAGEYR</code></td><td>9,254</td></tr>
      <tr><td>Body mass index</td><td><code>BMXBMI</code></td><td>8,005</td></tr>
      <tr><td>Day-1 dietary energy</td><td><code>DR1TKCAL</code></td><td>7,484</td></tr>
      <tr><td>Fasting glucose</td><td><code>LBXGLU</code></td><td>2,891</td></tr>
    </tbody>
  </table>

  <figure class="science-figure" data-id="FIG-1" data-clean-src="${figure1Img}">
    <img src="${figure1Img}" alt="Unweighted NHANES 2017–2018 measurement coverage across age, BMI, day-one dietary energy, and fasting glucose; fewer participants have all four values than have demographic records." />
    <figcaption>Figure 1: Selected measurement coverage in NHANES 2017–2018. Participants with a demographic record do not necessarily have observations for every body, dietary, or laboratory variable. Original figure from the lecture's audited public-use data analysis.</figcaption>
  </figure>

  <p>The demographic file contains 9,254 participants, while only <strong>2,614</strong> have all four selected measurements observed together in the audited analysis. That smaller complete-case group is not simply evidence that thousands of measurements were collected badly. Some components, especially fasting glucose, have different sampling and eligibility conditions.</p>
  <p>Before combining measurements, researchers should ask whether a record is absent because the participant was ineligible, was not selected for a component, did not complete a procedure, or has a missing recorded value. These situations can have different consequences for analysis.</p>

  <h3>Why this matters for AI</h3>
  <p>A machine-learning model learns from the records supplied to it. If we restrict analysis to participants with all four measurements, the resulting subset is different from the full demographic sample. If we replace unavailable values or discard records without understanding why they are absent, we can alter the scientific question and introduce bias. <strong>More columns in a dataset do not guarantee better evidence.</strong></p>

  <h2>4. The same data can tell different stories</h2>
  <p>A graph is an interpretation of data through a selected measure and denominator. Consider the age-and-BMI observations used in the lecture. The audited adult subset contains <strong>5,175</strong> participants with both age and BMI observed.</p>

  <h3>Participant counts: how many observations?</h3>
  <figure class="science-figure" data-id="FIG-2" data-clean-src="${figure2Img}">
    <img src="${figure2Img}" alt="Heatmap of unweighted NHANES age-group by BMI-category participant counts; cell intensity indicates observed counts." />
    <figcaption>Figure 2: Unweighted participant counts by age group and BMI category. A larger count can reflect how many people were observed in an age group, not necessarily a larger proportion within that group.</figcaption>
  </figure>
  <p>A count heatmap answers the question <em>how many observed participants fall in each combination?</em> It is useful for understanding where observations are concentrated. But age groups need not contain the same number of sampled participants. Comparing raw cell sizes alone can therefore be misleading.</p>

  <h3>Within-age-group percentages: what proportion of each group?</h3>
  <figure class="science-figure" data-id="FIG-3" data-clean-src="${figure3Img}">
    <img src="${figure3Img}" alt="NHANES age-group by BMI-category heatmap expressed as unweighted percentages within each age group, with each row adding to 100 percent." />
    <figcaption>Figure 3: The same age-and-BMI observations expressed as within-age-group percentages. Each age-group row uses its own observed denominator and sums to 100%; these are not survey-weighted population prevalence estimates.</figcaption>
  </figure>
  <p>Changing from counts to within-group percentages changes the denominator. Each row now asks <em>among observed people in this age group, what fraction belongs to each BMI category?</em> It is a different descriptive question, even though the underlying observations are unchanged.</p>
  <p>These percentages are still unweighted. NHANES uses a complex probability sampling design, so estimating patterns in the US civilian noninstitutionalized population requires suitable survey weights and design-aware analysis. Neither heatmap should be interpreted as a national prevalence estimate or evidence of a causal effect. <sup><a href="#ref5">5</a></sup></p>

  <h2>5. Dietary energy: describing variation is not explaining it</h2>
  <p>The dietary-energy example uses <strong>4,742 adults</strong> with an observed first-day energy intake. A distribution groups their reported values into intervals measured in kilocalories (kcal). Equal-width 1,000-kcal bins make bar heights comparable across the displayed intervals.</p>
  <figure class="science-figure" data-id="FIG-4" data-clean-src="${figure4Img}">
    <img src="${figure4Img}" alt="Unweighted frequency distribution of day-one reported dietary energy among 4742 adult NHANES participants using 1000-kilocalorie bins below 6000 kilocalories, with a separate count of 28 observations at or above 6000." />
    <figcaption>Figure 4: Distribution of reported Day-1 dietary energy among 4,742 adults in the audited teaching dataset. The equal-width intervals below 6,000 kcal describe observed variation; 28 observations at or above 6,000 kcal are recorded separately in the source analysis. These are unweighted sample counts, not usual-intake estimates.</figcaption>
  </figure>
  <p>People report different amounts of dietary energy on a given day. The figure shows how those observations are distributed. It does <strong>not</strong> demonstrate why one person reported more energy than another, nor does it reveal a person's usual dietary intake. A single 24-hour recall is a measurement of a particular day, not a direct measure of long-term dietary habits. <sup><a href="#ref3">3</a></sup></p>
  <p>Nor can we conclude that values in the upper tail are erroneous simply because they are unusual. Their interpretation would require examining the recording process, eligibility, and other supporting information.</p>

  <h2>6. Where does artificial intelligence actually help?</h2>
  <p>Not every useful pattern requires AI. Counting participants, calculating percentages, and plotting a distribution are forms of <strong>descriptive analysis</strong>. Their goal is to summarize observations. Machine learning becomes relevant when we have a suitable learning task, such as predicting an outcome from measured features, and enough appropriate data to evaluate how well the prediction generalizes.</p>

  <table class="science-table" data-id="rk-2026-001-table-2">
    <caption>Table 2: Different scientific questions call for different methods and interpretations.</caption>
    <thead>
      <tr><th scope="col">Question</th><th scope="col">Possible approach</th><th scope="col">What the result establishes</th></tr>
    </thead>
    <tbody>
      <tr><td>How many participants have a recorded glucose value?</td><td>Descriptive counting</td><td>Coverage in the inspected records</td></tr>
      <tr><td>How is reported dietary energy distributed?</td><td>Descriptive visualization</td><td>Observed variation, subject to measurement limits</td></tr>
      <tr><td>Can selected measurements predict a defined outcome for unseen records?</td><td>Potential machine-learning task</td><td>Predictive performance only after appropriate independent evaluation</td></tr>
      <tr><td>Does changing a dietary factor cause a health improvement?</td><td>Causal research design and analysis</td><td>Requires evidence beyond an observed association or predictive score</td></tr>
    </tbody>
  </table>

  <p>These are distinct questions. A computer can generate a plausible prediction that has not been validated. Even a well-validated prediction does not, by itself, establish causation. The current NHANES figures train <strong>no ML model</strong> and make <strong>no prediction about future disease risk</strong>.</p>

  <h2>7. Apply the reasoning to Food and Nutritional Sciences</h2>
  <p>Suppose a research team wants to study differences in reported dietary intake across groups of adults. A sensible first step is to document how dietary intake was assessed, whether records represent the same period, which participants have usable measurements, and which potential confounding factors are available. The team could then describe the sample and decide whether its research question calls for a statistical comparison or a predictive model.</p>
  <p>In food science, similar reasoning applies to product-quality measurements, ingredient characteristics, and processing conditions. The data must represent the property of interest, and the method must be evaluated for its intended use. A model trained on unsuitable measurements is not made scientifically sound merely by being called AI.</p>

  <h2>8. Questions to check your understanding</h2>
  <ol>
    <li><strong>Why is 9,254 not the correct sample size for every NHANES analysis?</strong> Different variables have different measurement availability, eligibility, and sampling procedures.</li>
    <li><strong>Why can a count heatmap and a percentage heatmap look different?</strong> One displays absolute observations, while the other uses a within-group denominator.</li>
    <li><strong>Does a distribution of one-day dietary energy explain habitual diet or health outcomes?</strong> No. It describes observed reports for that day and needs additional study for longer-term or causal interpretation.</li>
    <li><strong>Did the figures in this lesson use machine learning?</strong> No. They were produced through descriptive data analysis.</li>
  </ol>

  <h2>Takeaway</h2>
  <p>The first skill needed for AI in health sciences is not learning a programming command. It is learning to ask what was measured, which observations are available, what a graph's denominator means, and which conclusions the evidence permits. AI and machine learning can become useful later in the workflow, but reliable scientific reasoning must come first.</p>

  <h2>Sources and data provenance</h2>
  <p>The figures originate from the lecture's audited analysis of CDC NHANES 2017–2018 public-use data, not from generated synthetic participants or model predictions. The source analysis linked components using <code>SEQN</code> and retained aggregate counts for teaching. Figures reproduced here are the original locally generated SVG assets; no individual participant records appear.</p>
  <ol>
    <li id="ref1"><a href="https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/DEMO_J.htm" target="_blank" rel="noopener noreferrer">CDC/NCHS. NHANES 2017–2018: Demographic Variables and Sample Weights (DEMO_J).</a></li>
    <li id="ref2"><a href="https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/BMX_J.htm" target="_blank" rel="noopener noreferrer">CDC/NCHS. NHANES 2017–2018: Body Measures (BMX_J).</a></li>
    <li id="ref3"><a href="https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/DR1TOT_J.htm" target="_blank" rel="noopener noreferrer">CDC/NCHS. NHANES 2017–2018: Dietary Interview — Total Nutrient Intakes, First Day (DR1TOT_J).</a></li>
    <li id="ref4"><a href="https://wwwn.cdc.gov/Nchs/Data/Nhanes/Public/2017/DataFiles/GLU_J.htm" target="_blank" rel="noopener noreferrer">CDC/NCHS. NHANES 2017–2018: Plasma Fasting Glucose (GLU_J).</a></li>
    <li id="ref5"><a href="https://wwwn.cdc.gov/nchs/nhanes/tutorials/SampleDesign.aspx" target="_blank" rel="noopener noreferrer">CDC/NCHS. NHANES Tutorials: Sample Design.</a></li>
  </ol>
</article>
  `,
};

export default article;

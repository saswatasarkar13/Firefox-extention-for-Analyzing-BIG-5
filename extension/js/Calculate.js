function calculateSummary(data) {
    const traits = data.split(' ');
    const totalCount = traits.length;
    const summary = {};
  
    for (const trait of traits) {
      if (summary.hasOwnProperty(trait)) {
        summary[trait]++;
      } else {
        summary[trait] = 1;
      }
    }
  
    for (const trait in summary) {
      if (summary.hasOwnProperty(trait)) {
        const percentage = ((summary[trait] / totalCount) * 100).toFixed(2);
        summary[trait] = percentage + '%';
      }
    }
  
    return summary;
  }
  
  // Example usage
  const data = "Extraversion Agreeableness Extraversion Agreeableness Conscientiousness Neuroticism Openness Extraversion Agreeableness Extraversion Agreeableness Conscientiousness Neuroticism Openness Extraversion Agreeableness Extraversion Agreeableness Conscientiousness Neuroticism Openness Extraversion Agreeableness Extraversion Agreeableness Conscientiousness Neuroticism Openness";
  
  const summary = calculateSummary(data);
  
  // Output the summary
  for (const trait in summary) {
    if (summary.hasOwnProperty(trait)) {
      console.log(trait + ': ' + summary[trait]);
    }
  }

  
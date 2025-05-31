// Levenshtein distance algorithm for fuzzy matching
function levenshteinDistance(str1, str2) {
  const track = Array(str2.length + 1).fill(null).map(() => 
    Array(str1.length + 1).fill(null));
  
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator, // substitution
      );
    }
  }
  
  return track[str2.length][str1.length];
}

// Function to check if a string matches a query with fuzzy matching
export function fuzzyMatch(text, query, threshold = 0.3) {
  if (!text || !query) return false;
  
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  
  // Exact match check
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // For very short queries, be more strict
  if (query.length < 3) return normalizedText.includes(normalizedQuery);
  
  // Fuzzy match for longer queries
  const distance = levenshteinDistance(normalizedText, normalizedQuery);
  const maxLength = Math.max(normalizedText.length, normalizedQuery.length);
  const similarity = 1 - distance / maxLength;
  
  return similarity > threshold;
}

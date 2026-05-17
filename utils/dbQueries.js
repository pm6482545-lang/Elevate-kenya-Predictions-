import { supabase } from '../lib/supabase';

// 1. Get all prediction papers (KPSEA, KJSEA, KCSE) by subcategory slug
export async function getPredictionPapers(subCategorySlug) {
  const { data, error } = await supabase
    .from('resources')
    .select(`
      id, title, price, is_premium, file_path,
      sub_categories!inner(slug, name),
      subjects(name)
    `)
    .eq('sub_categories.slug', subCategorySlug);

  if (error) {
    console.error('Error fetching prediction papers:', error);
    return [];
  }
  return data;
}

// 2. Get termly exams matching level, term, and subject
export async function getTermlyExams(gradeName, termNumber, subjectSlug) {
  const { data, error } = await supabase
    .from('resources')
    .select(`
      id, title, price, is_premium, file_path,
      academic_levels!inner(name),
      subjects!inner(slug, name)
    `)
    .eq('academic_levels.name', gradeName)
    .eq('term', termNumber)
    .eq('subjects.slug', subjectSlug);

  if (error) {
    console.error('Error fetching termly exams:', error);
    return [];
  }
  return data;
}

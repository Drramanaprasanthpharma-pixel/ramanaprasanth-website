-- Auto-generated from src/lib/data/interactions.ts. Run in the Supabase SQL editor
-- as an alternative to `npm run seed`. Safe to re-run (upserts by id).

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('ceftriaxone_calcium-gluconate', 'Ceftriaxone', 'Calcium Gluconate', 'incompatible', 97, 'chemical', 'major', 'Ceftriaxone can form an insoluble ceftriaxone-calcium precipitate. Reports of fatal precipitates in neonatal lungs and kidneys led to a black-box style warning against co-administration of ceftriaxone with calcium-containing IV solutions, even via different lines/sites, in neonates.', 'Do not co-administer ceftriaxone and any calcium-containing IV product in neonates (≤28 days), regardless of infusion site or line. In older patients, avoid simultaneous Y-site administration; if both are required, use separate lines, separate sites, and flush thoroughly between infusions.', 'Space doses and use separate IV access; consider an alternative cephalosporin (e.g., cefotaxime) in neonates and small infants who require IV calcium.', 'Flush the line with at least 10-20 mL of 0.9% Sodium Chloride or 5% Dextrose before and after each drug if sequential administration on the same line is unavoidable in non-neonatal patients.', 'false', 'Contraindicated at Y-site in all age groups; absolute contraindication in neonates even on separate lines.', true, '[{"drug":"Ceftriaxone","concentration":"Higher concentrations","note":"Increase precipitation risk"},{"drug":"Calcium Gluconate","concentration":"Higher concentrations","note":"Increase precipitation risk"}]'::jsonb, ARRAY['neonates', 'pediatrics', 'icu', 'general']::text[], '{"neonates":"Absolute contraindication - do not co-administer via any route within 48 hours of each other.","pediatrics":"Avoid concurrent administration; use separate lines and confirm timing with pharmacy."}'::jsonb, '[{"source":"ASHP","citation":"Ceftriaxone-calcium precipitation safety communication","year":2009},{"source":"Trissel''s IV Compatibility","citation":"Ceftriaxone monograph"},{"source":"Micromedex","citation":"Ceftriaxone drug interaction data"}]'::jsonb, '2025-11-01', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('phenytoin_dextrose-5', 'Phenytoin', 'Sodium Chloride 0.9%', 'caution', 80, 'physical', 'moderate', 'Phenytoin is highly pH-dependent and prone to precipitation in solutions with pH below ~11.5. It is formulated in a propylene glycol/ethanol vehicle and precipitates when diluted in most IV fluids, particularly dextrose-containing solutions.', 'Administer phenytoin as a slow IV push through a dedicated line, or dilute only in 0.9% Sodium Chloride (never dextrose) and use an in-line filter, infusing immediately after preparation.', 'Prefer fosphenytoin where available, as it is water-soluble and compatible with a wider range of diluents and infusion rates.', 'Flush line with 0.9% Sodium Chloride before and after administration; never flush with dextrose-containing fluids.', 'conditional', 'Avoid Y-site with most drugs; compatibility is highly diluent- and concentration-dependent.', true, '[{"drug":"Phenytoin","concentration":"> 6.7 mg/mL in NS","note":"Increased precipitation risk; use inline filter"}]'::jsonb, ARRAY['icu', 'pediatrics', 'general']::text[], NULL, '[{"source":"Trissel''s IV Compatibility","citation":"Phenytoin monograph"},{"source":"King Guide to Parenteral Admixtures","citation":"Phenytoin sodium"}]'::jsonb, '2025-10-12', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('vancomycin_heparin', 'Vancomycin', 'Heparin Sodium', 'incompatible', 85, 'chemical', 'moderate', 'Vancomycin is a cationic glycopeptide that can complex with anionic heparin, forming a visible precipitate; the risk rises with higher concentrations of either agent.', 'Avoid Y-site co-infusion. If a central line is heparin-locked, flush thoroughly with 0.9% Sodium Chloride before and after vancomycin administration.', 'Use a separate lumen for vancomycin on multi-lumen central catheters when a heparin infusion is running.', 'Flush with 10-20 mL 0.9% Sodium Chloride before and after vancomycin infusion when sharing a line.', 'false', NULL, true, NULL, ARRAY['icu', 'general']::text[], NULL, '[{"source":"Trissel''s IV Compatibility","citation":"Vancomycin-heparin monograph"},{"source":"Micromedex","citation":"Vancomycin IV compatibility data"}]'::jsonb, '2025-09-20', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('furosemide_midazolam', 'Furosemide', 'Midazolam', 'incompatible', 88, 'physical', 'moderate', 'Furosemide is formulated at an alkaline pH while midazolam injection is formulated at an acidic pH; mixing the two shifts pH toward precipitation of midazolam free base.', 'Do not mix in the same syringe or Y-site. Administer through separate lines or sequentially with a thorough flush.', 'Give as separate, sequential IV push/infusions on different access if only one lumen is available.', 'Flush with 0.9% Sodium Chloride between administrations.', 'false', NULL, false, NULL, ARRAY['icu', 'general']::text[], NULL, '[{"source":"Trissel''s IV Compatibility","citation":"Furosemide monograph"}]'::jsonb, '2025-08-15', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('dopamine_sodium-bicarbonate', 'Dopamine', 'Sodium Bicarbonate', 'incompatible', 90, 'chemical', 'major', 'Alkaline solutions such as sodium bicarbonate rapidly inactivate catecholamines like dopamine through oxidation, degrading potency and risking sub-therapeutic vasopressor effect.', 'Never mix or co-infuse in the same line. Use completely separate IV access for vasopressor infusions.', 'Run dopamine on a dedicated, clearly labeled central line; administer bicarbonate through a separate lumen.', 'If sequential use on the same line is unavoidable in an emergency, flush thoroughly with 0.9% Sodium Chloride first.', 'false', NULL, false, NULL, ARRAY['icu']::text[], '{"icu":"Common bedside error during codes - keep pressor lines dedicated and clearly labeled."}'::jsonb, '[{"source":"Trissel''s IV Compatibility","citation":"Dopamine monograph"},{"source":"ASHP","citation":"Vasopressor administration safety guidance"}]'::jsonb, '2025-07-05', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('propofol_midazolam', 'Propofol', 'Midazolam', 'compatible', 82, 'physical', 'minor', 'Both agents are commonly co-administered for procedural sedation; published Y-site compatibility studies show no visible precipitate or significant potency loss over short infusion periods.', 'Y-site co-administration is acceptable for short-term sedation with standard monitoring.', 'No alternative route typically required; continue standard sedation monitoring protocols.', 'Routine line flush with 0.9% Sodium Chloride at the end of sedation is sufficient.', 'true', NULL, false, NULL, ARRAY['icu', 'general']::text[], NULL, '[{"source":"Published Study","citation":"Propofol-midazolam Y-site compatibility study"}]'::jsonb, '2025-06-18', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('piperacillin-tazobactam_gentamicin', 'Piperacillin-Tazobactam', 'Gentamicin', 'incompatible', 92, 'chemical', 'major', 'Penicillins, including piperacillin-tazobactam, can chemically inactivate aminoglycosides such as gentamicin through covalent binding when mixed together, especially in renal-impaired patients or on standing.', 'Never mix in the same syringe, bag, or Y-site. Administer through separate lines with adequate temporal separation.', 'Infuse piperacillin-tazobactam and gentamicin on separate lumens; if only one lumen is available, separate by at least 1 hour with a flush between.', 'Flush with 10-20 mL 0.9% Sodium Chloride between infusions.', 'false', NULL, false, NULL, ARRAY['icu', 'pediatrics', 'neonates', 'general']::text[], '{"neonates":"Inactivation risk is heightened with prolonged contact time - avoid any shared line."}'::jsonb, '[{"source":"Trissel''s IV Compatibility","citation":"Piperacillin-aminoglycoside monograph"},{"source":"King Guide to Parenteral Admixtures","citation":"Aminoglycoside compatibility"}]'::jsonb, '2025-11-20', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('magnesium-sulfate_calcium-gluconate', 'Magnesium Sulfate', 'Calcium Gluconate', 'caution', 75, 'therapeutic', 'moderate', 'Magnesium and calcium are physically compatible in most diluents at standard concentrations, but calcium is the clinical antidote for magnesium toxicity, so co-infusion can mask or blunt therapeutic monitoring of either electrolyte''s effect.', 'Physical Y-site mixing is generally acceptable at usual concentrations, but confirm the clinical indication for concurrent use and monitor levels closely, particularly in pre-eclampsia management or neuromuscular monitoring.', 'If calcium is being given specifically as a magnesium toxicity antidote, use a separate line so titration of each is clear.', 'Standard flush between bags is sufficient if physically compatible per institutional data.', 'conditional', NULL, true, NULL, ARRAY['icu', 'oncology', 'general']::text[], NULL, '[{"source":"Micromedex","citation":"Magnesium sulfate compatibility data"}]'::jsonb, '2025-05-02', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('amiodarone_sodium-chloride-0.9', 'Amiodarone', 'Sodium Chloride 0.9%', 'caution', 78, 'physical', 'moderate', 'Amiodarone premix is stable in Dextrose 5% but shows reduced physical stability and greater adsorption to PVC tubing when diluted in 0.9% Sodium Chloride at low concentrations; also prone to precipitation when mixed at Y-site with alkaline or high-pH drugs.', 'Prefer Dextrose 5% as the diluent per manufacturer labeling. Use non-PVC (polyolefin) tubing/bags where available for prolonged infusions.', 'Administer through a dedicated central line for infusions exceeding 1 hour; use in-line filter per institutional protocol.', 'Flush thoroughly with the same diluent (D5W) before and after co-administered medications.', 'conditional', 'Compatible with many common ICU drugs at Y-site, but verify against your institution''s IV compatibility chart drug-by-drug.', true, '[{"drug":"Amiodarone","concentration":"< 2 mg/mL in NS","note":"Reduced stability reported"}]'::jsonb, ARRAY['icu', 'general']::text[], NULL, '[{"source":"Trissel''s IV Compatibility","citation":"Amiodarone monograph"},{"source":"ASHP","citation":"Amiodarone IV administration guidance"}]'::jsonb, '2025-10-30', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('insulin-regular_total-parenteral-nutrition', 'Insulin Regular (Human)', 'Total Parenteral Nutrition (TPN)', 'caution', 70, 'physical', 'moderate', 'Regular insulin can be added directly to TPN admixtures, but a variable proportion adsorbs to the plastic bag and tubing, making the effective delivered dose less predictable than IV push or a separate infusion.', 'If added to TPN, use consistent bag/tubing material and monitor glucose closely; many institutions prefer a separate, titratable insulin infusion for tighter control.', 'Run insulin as a separate infusion via syringe pump for patients needing frequent dose titration (e.g., ICU glycemic protocols).', 'Not applicable when infused within the TPN admixture; prime separate tubing fully if run independently to account for adsorption.', 'not-applicable', NULL, true, NULL, ARRAY['icu', 'general']::text[], NULL, '[{"source":"King Guide to Parenteral Admixtures","citation":"Insulin-TPN admixture data"}]'::jsonb, '2025-04-11', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('cisplatin_sodium-chloride-0.9', 'Cisplatin', 'Sodium Chloride 0.9%', 'compatible', 93, 'chemical', 'minor', 'Cisplatin requires a chloride-containing diluent (0.9% Sodium Chloride) to remain stable; low-chloride solutions such as Dextrose 5% in water accelerate aquation and degradation of the compound.', 'Dilute and infuse only in 0.9% Sodium Chloride (with or without added magnesium/mannitol per protocol); avoid dextrose-only diluents.', 'Follow institutional chemotherapy hydration protocol; pre- and post-hydration with normal saline is standard.', 'Flush line with 0.9% Sodium Chloride before and after infusion; use a dedicated line per chemotherapy safe-handling policy.', 'conditional', 'Avoid Y-site with drugs requiring alkaline or dextrose-based diluents; verify institutional oncology compatibility chart.', true, NULL, ARRAY['oncology', 'icu']::text[], '{"oncology":"Use closed-system transfer devices and follow hazardous drug handling precautions."}'::jsonb, '[{"source":"Trissel''s IV Compatibility","citation":"Cisplatin monograph"},{"source":"ASHP","citation":"Cisplatin handling and administration guidance"}]'::jsonb, '2025-09-02', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('doxorubicin_sodium-bicarbonate', 'Doxorubicin', 'Sodium Bicarbonate', 'incompatible', 86, 'chemical', 'major', 'Doxorubicin is unstable at alkaline pH and degrades rapidly (color change/precipitation) when exposed to bicarbonate or other alkaline solutions.', 'Never mix or co-infuse with alkaline solutions. Prepare and administer per vesicant/hazardous drug handling protocol on a dedicated line.', 'Use a dedicated central line; if extravasation risk is a concern, follow institutional vesicant extravasation protocol rather than altering diluent.', 'Flush with 0.9% Sodium Chloride or D5W before and after infusion; never flush with bicarbonate-containing fluids.', 'false', NULL, false, NULL, ARRAY['oncology']::text[], '{"oncology":"Vesicant - confirm line patency before infusion and monitor closely for extravasation."}'::jsonb, '[{"source":"Trissel''s IV Compatibility","citation":"Doxorubicin monograph"}]'::jsonb, '2025-03-22', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('morphine_ondansetron', 'Morphine Sulfate', 'Ondansetron', 'compatible', 84, 'physical', 'minor', 'Commonly co-administered for pain and nausea management (e.g., PCA settings, post-operative care); published Y-site studies show no visible incompatibility at usual clinical concentrations.', 'Y-site co-administration is acceptable at standard concentrations; monitor for sedation given morphine''s CNS depressant effect combined with ondansetron.', 'No special alternative route required for standard dosing.', 'Routine flush with 0.9% Sodium Chloride is sufficient between unrelated infusions.', 'true', NULL, false, NULL, ARRAY['icu', 'oncology', 'general', 'pediatrics']::text[], NULL, '[{"source":"Trissel''s IV Compatibility","citation":"Morphine-ondansetron Y-site data"}]'::jsonb, '2025-02-14', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('potassium-chloride_insulin-regular', 'Potassium Chloride', 'Insulin Regular (Human)', 'caution', 72, 'therapeutic', 'moderate', 'No direct physical/chemical incompatibility, but insulin drives potassium intracellularly; concurrent or sequential administration (e.g., in DKA management) requires tight coordination to avoid rebound hypokalemia or hyperkalemia.', 'Physically compatible for co-infusion where clinically indicated (e.g., DKA protocols), but monitor serum potassium closely and adjust per institutional protocol.', 'Use protocol-driven, separately titratable infusions in DKA management so each can be adjusted independently.', 'Standard flush practice applies; no special flush requirement beyond routine line care.', 'true', NULL, true, NULL, ARRAY['icu', 'pediatrics', 'general']::text[], NULL, '[{"source":"Micromedex","citation":"Potassium chloride-insulin coordination guidance"}]'::jsonb, '2025-01-19', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('norepinephrine_sodium-bicarbonate', 'Norepinephrine', 'Sodium Bicarbonate', 'incompatible', 89, 'chemical', 'major', 'Like other catecholamines, norepinephrine is rapidly oxidized and inactivated in alkaline solutions such as sodium bicarbonate, reducing vasopressor potency unpredictably.', 'Never mix or co-infuse in the same line. Use dedicated, clearly labeled vasopressor access.', 'Administer bicarbonate through a separate lumen or peripheral line distinct from the norepinephrine infusion.', 'Flush thoroughly with 0.9% Sodium Chloride if line sharing is unavoidable in an emergency.', 'false', NULL, false, NULL, ARRAY['icu']::text[], NULL, '[{"source":"Trissel''s IV Compatibility","citation":"Norepinephrine monograph"}]'::jsonb, '2025-06-30', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('pantoprazole_multivitamin', 'Pantoprazole', 'Sodium Chloride 0.9%', 'compatible', 91, 'physical', 'minor', 'Pantoprazole is stable when reconstituted and diluted in 0.9% Sodium Chloride within the manufacturer-specified concentration and time window.', 'Administer as a standalone infusion in 0.9% Sodium Chloride within the stability window (typically infuse within a few hours of reconstitution).', 'No alternative administration route typically required for standard dosing.', 'Flush line before and after with 0.9% Sodium Chloride, especially before/after co-administered incompatible drugs.', 'conditional', 'Avoid Y-site with drugs requiring acidic diluents; verify institutional chart for specific pairs.', true, NULL, ARRAY['icu', 'general']::text[], NULL, '[{"source":"ASHP","citation":"Pantoprazole IV stability data"}]'::jsonb, '2025-07-27', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;

insert into compatibility_records (id, drug_a, drug_b, status, confidence_score, type, severity, mechanism, recommended_action, alternative_administration, flush_recommendation, y_site_compatible, y_site_notes, concentration_dependent, concentration_notes, care_settings, care_setting_notes, reference_list, last_reviewed, reviewed_by)
values ('labetalol_furosemide', 'Labetalol', 'Furosemide', 'caution', 65, 'physical', 'minor', 'Limited published Y-site compatibility data exist for this specific pair; theoretical pH mismatch (furosemide alkaline vs. labetalol acidic) raises a precipitation concern similar to other alkaline-diluent drugs, but confirmed institutional or literature data are sparse.', 'Treat as limited-data / use with caution: prefer separate lines until institution-specific compatibility testing or updated literature confirms safety.', 'Administer sequentially with a flush between doses if a single lumen must be used.', 'Flush with 0.9% Sodium Chloride between administrations.', 'conditional', NULL, false, NULL, ARRAY['icu', 'general']::text[], NULL, '[{"source":"Micromedex","citation":"Labetalol compatibility data (limited)"}]'::jsonb, '2024-12-05', NULL)
on conflict (id) do update set
  drug_a = excluded.drug_a, drug_b = excluded.drug_b, status = excluded.status,
  confidence_score = excluded.confidence_score, type = excluded.type, severity = excluded.severity,
  mechanism = excluded.mechanism, recommended_action = excluded.recommended_action,
  alternative_administration = excluded.alternative_administration, flush_recommendation = excluded.flush_recommendation,
  y_site_compatible = excluded.y_site_compatible, y_site_notes = excluded.y_site_notes,
  concentration_dependent = excluded.concentration_dependent, concentration_notes = excluded.concentration_notes,
  care_settings = excluded.care_settings, care_setting_notes = excluded.care_setting_notes,
  reference_list = excluded.reference_list, last_reviewed = excluded.last_reviewed, reviewed_by = excluded.reviewed_by;


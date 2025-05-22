package main

import (
	"context"
)

func getQuizSections() ([]Section, error) {
	rows, err := db.Query(context.Background(), `
		SELECT s.id, s.name, q.id, q.text, o.id, o.text
		FROM sections s
		LEFT JOIN questions q ON s.id = q.section_id
		LEFT JOIN options o ON q.id = o.question_id
		ORDER BY s.id, q.id, o.id
	`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	sectionsMap := make(map[int]*Section)
	questionsMap := make(map[int]*Question)
	for rows.Next() {
		var sID int
		var sName string
		var qID, oID *int
		var qText, oText *string
		err := rows.Scan(&sID, &sName, &qID, &qText, &oID, &oText)
		if err != nil {
			return nil, err
		}

		if _, exists := sectionsMap[sID]; !exists {
			sectionsMap[sID] = &Section{ID: sID, Name: sName, Questions: []Question{}}
		}
		if qID != nil {
			if _, exists := questionsMap[*qID]; !exists {
				question := Question{ID: *qID, Text: *qText, Options: []Option{}}
				sectionsMap[sID].Questions = append(sectionsMap[sID].Questions, question)
				questionsMap[*qID] = &sectionsMap[sID].Questions[len(sectionsMap[sID].Questions)-1]
			}
			if oID != nil {
				questionsMap[*qID].Options = append(questionsMap[*qID].Options, Option{ID: *oID, Text: *oText})
			}
		}
	}

	var sections []Section
	for _, s := range sectionsMap {
		sections = append(sections, *s)
	}
	return sections, nil
}

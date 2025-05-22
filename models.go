package main

type Section struct {
	ID        int        `json:"id"`
	Name      string     `json:"name"`
	Questions []Question `json:"questions"`
}

type Question struct {
	ID      int      `json:"id"`
	Text    string   `json:"text"`
	Options []Option `json:"options"`
}

type Option struct {
	ID   int    `json:"id"`
	Text string `json:"text"`
}

type Subscore struct {
	Name  string `json:"name"`
	Score int    `json:"score"`
}

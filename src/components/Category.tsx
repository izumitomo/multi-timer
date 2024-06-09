import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

function Category({ id }: { id: number }) {
  const [category, setCategory] = useState("");

  const handleChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value as string);
    localStorage.setItem(`category-${id}`, e.target.value as string);
  };
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel>category</InputLabel>
      <Select
        id={`category-${id}`}
        label="category"
        value={category}
        onChange={handleChange}
      >
        <MenuItem value={"インターンレビュー"}>インターンレビュー</MenuItem>
        <MenuItem value={"担当エピックタスク"}>担当エピックタスク</MenuItem>
        <MenuItem value={"担当外エピックタスク"}>担当外エピックタスク</MenuItem>
        <MenuItem value={"アラート系突発タスク"}>アラート系突発タスク</MenuItem>
        <MenuItem value={"定期mtg"}>定期mtg</MenuItem>
        <MenuItem value={"不定期mtg"}>不定期mtg</MenuItem>
        <MenuItem value={"スクラム系イベント"}>スクラム系イベント</MenuItem>
        <MenuItem value={"運用関連作業"}>運用関連作業</MenuItem>
        <MenuItem value={"その他雑務"}>その他雑務</MenuItem>
      </Select>
    </FormControl>
  );
}

// インターンレビュー
// 担当エピックタスク
// 担当外エピックタスク
// アラート系突発タスク
// 定期mtg
// 不定期mtg
// スクラム系イベント
// 運用関連作業
// その他雑務

export default Category;

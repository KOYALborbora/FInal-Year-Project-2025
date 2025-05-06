"use client";
import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Placeholder for paginated data fetching
const PAGE_SIZE = 5;
const mockHistory = Array.from({ length: 18 }).map((_, i) => ({
  id: `upload-${i + 1}`,
  date: `2025-04-${(i % 30) + 1}`,
  text: `Sample text #${i + 1}`,
  image: i % 2 === 0 ? `/sample${(i % 3) + 1}.png` : null,
  textSentiment: ["Positive", "Negative", "Neutral"][i % 3],
  imageSentiment: ["Neutral", "Positive", "Negative"][i % 3],
}));

export function HistoryTable() {
  // TODO: Fetch paginated history from /api/history
  const [page, setPage] = React.useState(1);
  const totalPages = Math.ceil(mockHistory.length / PAGE_SIZE);
  const pageData = mockHistory.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="w-full max-w-4xl bg-white/90 dark:bg-black/70 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
      <h2 className="text-2xl font-bold text-center text-foreground mb-4">Upload History</h2>
      <Table>
        <TableCaption>A list of your past uploads and analysis results.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Text</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Text Sentiment</TableHead>
            <TableHead>Image Sentiment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pageData.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell className="max-w-[180px] truncate" title={item.text}>{item.text}</TableCell>
              <TableCell>
                {item.image ? (
                  <img src={item.image} alt="upload" className="w-12 h-12 object-cover rounded shadow" />
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell>{item.textSentiment}</TableCell>
              <TableCell>{item.imageSentiment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-6">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
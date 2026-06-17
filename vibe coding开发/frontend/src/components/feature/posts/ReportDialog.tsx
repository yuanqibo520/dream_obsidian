import { useState } from "react";
import { Button } from "../../common/Button";
import { Modal } from "../../common/Modal";
import { Textarea } from "../../common/Textarea";

type ReportDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (reason: string, detail: string) => void;
  submitting?: boolean;
};

export function ReportDialog({ open, onClose, onSubmit, submitting }: ReportDialogProps) {
  const [reason, setReason] = useState("违规内容");
  const [detail, setDetail] = useState("");

  return (
    <Modal open={open} title="举报内容" onClose={onClose}>
      <div className="space-y-4">
        <select className="w-full rounded-xl border border-line bg-white/70 px-4 py-3 text-sm" value={reason} onChange={(event) => setReason(event.target.value)}>
          <option>违规内容</option>
          <option>垃圾广告</option>
          <option>人身攻击</option>
          <option>隐私泄露</option>
        </select>
        <Textarea value={detail} onChange={(event) => setDetail(event.target.value)} placeholder="补充说明，帮助管理员更快处理" />
        <Button
          className="w-full"
          disabled={submitting}
          onClick={() => {
            onSubmit(reason, detail);
          }}
        >
          {submitting ? "提交中" : "提交举报"}
        </Button>
      </div>
    </Modal>
  );
}

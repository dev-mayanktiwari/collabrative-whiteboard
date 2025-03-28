import { toast } from "@repo/ui";

const CopyToClipboard = async ({ url }: { url: string }) => {
  try {
    // console.log("Hello")
    // console.log("URL", url);
    const COPY_URL = import.meta.env.VITE_FRONTEND_URL + `/canvas/${url}`;
    await navigator.clipboard.writeText(COPY_URL);
    toast({
      title: "Copied to clipboard",
      description: "The URL has been copied to your clipboard.",
      status: "success",
      duration: 3000,
    });
  } catch {
    toast({
      title: "Error copying URL",
      description: "An error occurred while copying the URL to your clipboard.",
      status: "destructive",
      duration: 3000,
    });
  }
};

export default CopyToClipboard;

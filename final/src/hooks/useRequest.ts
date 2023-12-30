import { useRouter } from "next/navigation";

export default function useRequest() {
    const router = useRouter();
    const postRequest = async ({
        group,
        type,
        number,
        filename,
        comment,
        status
      }: {
        group:number
        type:string
        number:number
        filename:string
        comment?:string
        status?:string
      }) => {
        // console.log(group,type,number);
        const res = await fetch("/api/reserve", {
          method: "POST",
          body: JSON.stringify({
            group,
            type,
            number,
            filename,
            comment,
            status
          }),
        });
        
        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error);
        }
    
    
        // router.refresh() is a Next.js function that refreshes the page without
        // reloading the page. This is useful for when we want to update the UI
        // from server components.
        router.refresh();
        
      };
    
      return {
        postRequest
      };
}
import { SSRContext, SupabaseServerWrapper } from "./wrappers/supabase";

export function redirectIfLoggedOut(
  destination: string,
  getServerSideProps: (ctx: SSRContext<any>) => Promise<any>
): (ctx: SSRContext<any>) => any {
  return async (ctx: SSRContext<any>) => {
    const supabase = new SupabaseServerWrapper(ctx).getClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return {
        redirect: {
          destination,
          permanent: false,
        },
      };
    }
    return await getServerSideProps(ctx);
  };
}

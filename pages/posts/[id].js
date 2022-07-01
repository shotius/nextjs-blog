import Head from 'next/head';
import Date from '../../components/Date';
import Layout from '../../components/Layout';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css';


export default function Post({ postData }) {
  // console.log('post', postData);
  return (
    <Layout>
      <Head><title>{postData.title}</title></Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
         <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
      </article>
      <br />
      {postData.id}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

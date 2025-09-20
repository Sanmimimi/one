import React from 'react';
import clsx from 'clsx';
import Translate, {translate} from '@docusaurus/Translate';
import {PageMetadata} from '@docusaurus/theme-common';
import Layout from '@theme/Layout';
import styles from './styles.module.css';

export default function NotFound(): JSX.Element {
  return (
    <>
      <PageMetadata
        title={translate({
          id: 'theme.NotFound.title',
          message: '哎呀，页面失踪了~',
        })}
      />
      <Layout>
        <main className={clsx('container margin-vert--xl', styles.notFoundContainer)}>
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className={styles.notFoundContent}>
                <img
                  src="/svg/undraw_page-eaten_b2rt.svg"
                  alt="Page not found"
                  className={styles.notFoundImage}
                />
                <h1 className={styles.notFoundTitle}>
                  <Translate
                    id="theme.NotFound.title"
                    description="The title of the 404 page">
                    哎呀，页面失踪了~
                  </Translate>
                </h1>
                <p className={styles.notFoundDescription}>
                  <Translate
                    id="theme.NotFound.p1"
                    description="The first paragraph of the 404 page">
                    找不到你要访问的页面，要不点点别处看看？
                  </Translate>
                </p>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

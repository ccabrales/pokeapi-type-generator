declare module "node-svn-ultimate" {
  export interface Options {
    trustServerCert?: boolean;
    username?: string;
    password?: string;
    shell?: string;
    cwd?: string;
    quiet?: boolean;
    force?: boolean;
    revision?: number;
    depth?: string;
    ignoreExternals?: boolean;
    params?: string[];
    "config-option"?: string[];
  }

  export type Callback = Function; // tslint:disable-line

  export const commands: {
    add: (files: string | string[], options?: Options, cb?: Callback) => void;
    cat: any;
    checkout: any;
    ci: any;
    cleanup: any;
    co: any;
    commit: any;
    copy: any;
    cp: any;
    del: any;
    exp: any;
    export: (
      src: string,
      dest: string,
      options?: Options,
      cb?: Callback
    ) => void;
    imp: any;
    import: any;
    info: any;
    list: any;
    lock: any;
    log: any;
    ls: any;
    merge: any;
    mergeinfo: any;
    mkdir: any;
    move: any;
    mucc: any;
    mv: any;
    pd: any;
    pdel: any;
    pg: any;
    pget: any;
    pl: any;
    plist: any;
    propdel: any;
    propget: any;
    proplist: any;
    propset: any;
    ps: any;
    pset: any;
    relocate: any;
    remove: any;
    ren: any;
    rename: any;
    revert: any;
    rm: any;
    st: any;
    stat: any;
    status: any;
    switch: any;
    unlock: any;
    up: any;
    update: any;
    upgrade: any;
  };

  export const util: {
    MuccHelper: any;
    getBranches: any;
    getLatestTag: any;
    getRevision: any;
    getTags: any;
    getWorkingCopyRevision: any;
    parseUrl: any;
  };
}

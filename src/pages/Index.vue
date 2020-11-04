<template>
  <div class="q-pa-md q-gutter-sm">
    <q-tree
      :expanded.sync="expanded"
      :nodes="bookmarkTreeNodes"
      node-key="label"
      ref="qtree"
    ></q-tree>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from '@vue/composition-api';
import {
  InitEventResponse,
  QTreeNode,
  BookmarkTreeNode
} from 'src/components/models';

const convertToQTreeNode = (bookmarks: BookmarkTreeNode[]): QTreeNode[] => {
  return bookmarks.map<QTreeNode>(bookmark => ({
    label: bookmark.title || 'Root',
    children: convertToQTreeNode(bookmark.children || [])
  }));
};

export default defineComponent({
  name: 'PageIndex',
  components: {},
  setup(_, ctx) {
    const bookmarkTreeNodes = ref<QTreeNode[]>([]);
    const expanded = ref<string[]>(['Root']);

    onMounted(async () => {
      const response = await (ctx.root.$q.bex.send('init') as Promise<
        InitEventResponse
      >);

      const treeValue = convertToQTreeNode(response.data);
      bookmarkTreeNodes.value = treeValue;
    });

    return { bookmarkTreeNodes, expanded };
  }
});
</script>

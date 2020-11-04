<template>
  <div class="q-pa-md q-gutter-sm">
    <q-input ref="filter" filled v-model="filterText" label="Filter">
      <template v-slot:append>
        <q-icon
          v-if="filterText !== ''"
          name="clear"
          class="cursor-pointer"
          @click="resetFilter"
        ></q-icon>
      </template>
    </q-input>

    <q-tree
      :expanded.sync="expanded"
      :nodes="bookmarkTreeNodes"
      node-key="label"
      ref="qtree"
      :no-results-label="`Oops - Nothing 😅`"
      :filter="filterText"
    ></q-tree>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from '@vue/composition-api';
import {
  InitEventResponse,
  QTreeNode,
  BookmarkTreeNode
} from 'src/components/models';

const convertToQTreeNode = (bookmarks: BookmarkTreeNode[]): QTreeNode[] => {
  return bookmarks.map<QTreeNode>(bookmark => ({
    label: bookmark.title || 'Root',
    children: convertToQTreeNode(bookmark.children || []),
    url: bookmark.url,
    handler: node => {
      if (node.url) {
        window.open(node.url, '_blank');
      }
    }
  }));
};

export default defineComponent({
  name: 'PageIndex',
  components: {},
  setup(_, ctx) {
    const bookmarkTreeNodes = ref<QTreeNode[]>([]);
    const expanded = ref<string[]>([]);
    const filterText = ref<string>('');

    onMounted(async () => {
      const response = await (ctx.root.$q.bex.send('init') as Promise<
        InitEventResponse
      >);

      const treeValue = convertToQTreeNode(response.data);
      bookmarkTreeNodes.value = treeValue;
    });

    watch(filterText, filterText => {
      if (filterText) {
        (ctx as any).refs.qtree.expandAll();
      } else {
        (ctx as any).refs.qtree.collapseAll();
      }

      /* ... */
    });

    const resetFilter = () => {
      filterText.value = '';
      (ctx as any).refs.filter.focus();
    };

    return { bookmarkTreeNodes, expanded, filterText, resetFilter };
  }
});
</script>

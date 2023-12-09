import * as vscode from "vscode";

/**
 * Represent a FileFocus Group that is rendered inside of a
 * vscode TreeViewComponent.
 *
 * Note: In FileFocus a folder is an actual resources like a directory while a Group is a logical (virtual)
 * folder for arbitraily organising actual resources.
 *
 */
export class GroupItem extends vscode.TreeItem {
  objtype = "GroupItem";

  /**
   *
   * @param label The label for the node that is rendered in the TreeView
   * @param groupId The ID of the group that this node represents.
   * @param collapsibleState See vscode.TreeItemCollapsibleState.
   * @param isFavourite Set to true if this item should be marked as a favourite.
   * @param isReadOnly Set to true to prevent editing this group node.
   */
  constructor(
    public readonly label: string,
    public readonly groupId: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly isFavourite: boolean,
    public readonly isReadOnly: boolean
  ) {
    super(label, collapsibleState);
    this.contextValue = isReadOnly ? "GroupItemReadOnly" : "GroupItem";
    this.label = this.annotateLabel(label, this.isFavourite);
  }

  private annotateLabel(label: string, isFavourite: boolean) {
    if (isFavourite) {
      return `⭐ ${label}`;
    }
    return this.isReadOnly ? `🔹 ${label}` : label;
  }
}

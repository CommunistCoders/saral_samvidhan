using UnityEngine;

public class RotateUIArrow : MonoBehaviour
{
    public RectTransform arrowUI; // The UI element (arrow icon)
    public Transform target;      // The target to point at
    public Transform player;      // The player's transform

    void Update()
    {
        if (target != null)
        {
            // Get the direction from the player to the target
            Vector3 directionToTarget = (target.position - player.position).normalized;
            
            // Calculate the angle in degrees
            float angle = Mathf.Atan2(directionToTarget.z, directionToTarget.x) * Mathf.Rad2Deg;
            
            // Set the rotation of the UI arrow element
            arrowUI.rotation = Quaternion.Euler(0, 0, angle - 90);
        }
    }
}
